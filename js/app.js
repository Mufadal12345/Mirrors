// filename: js/app.js
import { router } from './router.js';
import { auth } from './auth.js';
import { dbOps } from './db.js';
import { ui, utils, defaultQuestionsPool } from './utils.js';

// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تشغيل الـ Routing لأول مرة
    router.handleRoute();

    // -- ربط الأحداث ديناميكياً (Event Delegation) --
    const contentDiv = document.getElementById('app-content');

    // 1. نموذج التسجيل
    contentDiv.addEventListener('submit', async (e) => {
        if (e.target.id === 'register-form') {
            e.preventDefault();
            const displayName = document.getElementById('reg-display-name').value;
            const username = document.getElementById('reg-username').value;
            const password = document.getElementById('reg-password').value;
            
            if (password.length < 4) {
                ui.showToast('خطأ', 'كلمة المرور يجب أن تكون 4 أحرف على الأقل.', 'danger');
                return;
            }
            await auth.register(username, password, displayName);
        }
    });

    // 2. نموذج تسجيل الدخول
    contentDiv.addEventListener('submit', async (e) => {
        if (e.target.id === 'login-form') {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            await auth.login(username, password);
        }
    });

    // 3. حفظ الأسئلة المخصصة (Create Page)
    contentDiv.addEventListener('click', async (e) => {
        if (e.target.id === 'save-questions-btn' || e.target.closest('#save-questions-btn')) {
            if (!auth.isAuthenticated()) return;
            
            // جمع الـ IDs للأسئلة المختارة
            const selectedQuestionIds = Array.from(document.querySelectorAll('.question-switcher:checked'))
                                            .map(cb => cb.value);

            if (selectedQuestionIds.length === 0) {
                ui.showToast('تنبيه', 'برجاء اختيار سؤال واحد على الأقل للاستبيان.', 'warning');
                return;
            }

            // تصفية المصفوفة الافتراضية
            const selectedQuestions = defaultQuestionsPool.filter(q => selectedQuestionIds.includes(q.id));
            
            const user = auth.getCurrentUser();
            const success = await dbOps.saveUserQuestions(user.uid, selectedQuestions);
            
            if (success) {
                router.navigate('/share');
            }
        }
    });

    // 4. إرسال استبيان المشارك (Survey Page)
    contentDiv.addEventListener('submit', async (e) => {
        if (e.target.id === 'survey-form') {
            e.preventDefault();
            
            // الحصول على الـ targetUserId من الرابط
            const path = window.location.pathname;
            const targetUserId = path.substring(3);

            // تجميع الإجابات
            const answersObj = {};
            const surveyInputs = document.querySelectorAll('.survey-input');
            
            let allSliderAndMultipleAnswered = true;

            surveyInputs.forEach(input => {
                // Multiple Choice
                if (input.type === 'radio') {
                    if (input.checked) {
                        answersObj[input.name] = input.value;
                    }
                } 
                // Slider & Text
                else {
                    if (input.value.trim() !== "") {
                         answersObj[input.name] = input.value;
                    } else if (input.hasAttribute('required') && !input.classList.contains('slider-input')) {
                        // النص الحر الإلزامي لم يتم ملؤه
                        allSliderAndMultipleAnswered = false; 
                    }
                }
            });

            // تحقق إضافي لأسئلة Multiple Choice (أن يكون كل سؤال تم اختيار خيار له)
            const radioNames = new Set(Array.from(document.querySelectorAll('input[type="radio"].survey-input')).map(r => r.name));
            for(let name of radioNames) {
                if(!answersObj[name]) allSliderAndMultipleAnswered = false;
            }

            if(!allSliderAndMultipleAnswered) {
                 ui.showToast('تنبيه', 'يرجى الإجابة على جميع أسئلة الاختيار المتعدد والمقياس.', 'warning');
                 return;
            }

            const anonymousMessage = document.getElementById('anonymous-message').value;

            const success = await dbOps.submitResponse(targetUserId, answersObj, anonymousMessage);
            
            if (success) {
                ui.renderThankYou();
            }
        }
    });
});

// -- استماع لأحداث UI المخصصة --

// 1. تسجيل الخروج
document.addEventListener('logoutTriggered', () => {
    auth.logout();
});

// 2. تفعيل تحليل AI (Results Page)
document.addEventListener('chartsInitialized', () => {
    const aiBtn = document.getElementById('get-ai-analysis-btn');
    if (!aiBtn) return;

    aiBtn.addEventListener('click', async () => {
        if (!auth.isAuthenticated()) return;
        
        const user = auth.getCurrentUser();
        const aiLoader = document.getElementById('ai-loader');
        const placeholder = document.getElementById('ai-placeholder-text');

        // تحديث الواجهة لبدء التحميل
        aiBtn.classList.add('d-none');
        placeholder.classList.add('d-none');
        aiLoader.classList.remove('d-none');

        try {
            // جلب البيانات مجدداً للتأكد من حداثتها
            const userData = await dbOps.getUserPublicData(user.uid);
            const responses = await dbOps.getUserResponses(user.uid);

            // إرسال طلب إلى Vercel Serverless Function
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    questions: userData.questions,
                    responses: responses,
                    displayName: user.displayName
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get analysis');
            }

            // عرض النص النهائي
            ui.renderAiAnalysisText(data.analysis);
            ui.showToast('نجاح', 'تم إعداد تقريرك بالذكاء الاصطناعي.', 'success');

        } catch (error) {
            console.error("AI Analysis Error:", error);
            ui.showToast('خطأ', 'حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. حاول مرة أخرى.', 'danger');
            // إعادة الواجهة لحالتها السابقة
            aiBtn.classList.remove('d-none');
            aiLoader.classList.add('d-none');
            placeholder.classList.remove('d-none');
        }
    });
});
