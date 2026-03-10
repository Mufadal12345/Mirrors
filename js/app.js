// filename: js/app.js
import { router } from './router.js';
import { auth } from './auth.js';
import { dbOps } from './db.js';
import { ui, utils, defaultQuestionsPool } from './utils.js';

// [تشخيص] - رسالة تبين أن الملف تم تحميله
console.log("✅ ملف app.js تم تحميله بنجاح.");

// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // [تشخيص] - رسالة تبين أن الـ DOM جاهز
    console.log("✅ الـ DOM جاهز تماماً.");

    // التحقق من وجود الحاوية الرئيسية
    const contentDiv = document.getElementById('app-content');
    if (!contentDiv) {
        console.error("❌ خطأ كارثي: لم يتم العثور على العنصر #app-content في الـ DOM.");
        return;
    } else {
        console.log("✅ تم العثور على الحاوية الرئيسية #app-content.");
    }

    // تشغيل الـ Routing لأول مرة لعرض الصفحة المناسبة بناءً على URL
    console.log("🔄 جاري تشغيل الـ Router الأولي...");
    router.handleRoute();

    // -- ربط الأحداث ديناميكياً باستخدام تفويض الأحداث (Event Delegation) --
    // نستمع للأحداث على الحاوية الرئيسية التي لا تتغير وهي `#app-content`

    // [جديد وتشخيص] - مستمع لحدث الضغط للتنقل بين الصفحات (Home Page)
    contentDiv.addEventListener('click', (e) => {
        // [تشخيص] - رسالة عند كل ضغطة في منطقة المحتوى
        console.log("🖱️ تم اكتشاف ضغطة داخل #app-content على العنصر:", e.target);

        // التحقق مما إذا كان العنصر الذي تم الضغط عليه (أو أبوه) هو أحد الأزرار المعنية
        const registerBtn = e.target.closest('#home-register-btn');
        const loginBtn = e.target.closest('#home-login-btn');
        const shareBtn = e.target.closest('#home-share-btn');
        const resultsBtn = e.target.closest('#home-results-btn');
        const thankYouHomeBtn = e.target.closest('#home-btn'); // زر صفحة شكراً
        
        // روابط الـ Auth في أسفل النماذج
        const toLoginLink = e.target.closest('#to-login-link');
        const toRegisterLink = e.target.closest('#to-register-link');
        
        // أزرار صفحة النتائج (Results Page)
        const toShareBtn = e.target.closest('#to-share-btn');
        const toShareBtn2 = e.target.closest('#to-share-btn-2');

        // أزرار صفحة المشاركة (Share Page)
        const copyLinkBtn = e.target.closest('#copy-link-btn');
        const shareWhatsappBtn = e.target.closest('#share-whatsapp-btn');
        const toResultsBtn = e.target.closest('#to-results-btn');

        if (registerBtn || toRegisterLink) {
            console.log("👉 تم الضغط على زر 'التسجيل'. جاري الانتقال...");
            if(toRegisterLink) e.preventDefault(); // منع سلوك الرابط الافتراضي
            router.navigate('/register');
        } 
        else if (loginBtn || toLoginLink) {
            console.log("👉 تم الضغط على زر 'تسجيل الدخول'. جاري الانتقال...");
            if(toLoginLink) e.preventDefault();
            router.navigate('/login');
        } 
        else if (shareBtn || toShareBtn || toShareBtn2) {
            console.log("👉 تم الضغط على زر 'المشاركة'. جاري الانتقال...");
            router.navigate('/share');
        } 
        else if (resultsBtn || toResultsBtn) {
            console.log("👉 تم الضغط على زر 'النتائج'. جاري الانتقال...");
            router.navigate('/results');
        }
        else if (thankYouHomeBtn) {
            router.navigate('/');
        }
        // التعامل مع وظائف صفحة المشاركة (Copy & WhatsApp)
        else if (copyLinkBtn) {
            const linkInput = document.getElementById('share-link-input');
            if(linkInput) utils.copyToClipboard(linkInput.value);
        }
        else if (shareWhatsappBtn) {
            const linkInput = document.getElementById('share-link-input');
            if(linkInput) {
                const shareText = `هذا الرابط سري تماماً! دخلت تطبيق (منظوري) لأعرف كيف تروني بصراحة. قيموني هنا ولن أعرف هويتكم: ${linkInput.value}`;
                utils.shareWhatsApp(shareText);
            }
        }
    });

    // 1. نموذج التسجيل
    contentDiv.addEventListener('submit', async (e) => {
        if (e.target.id === 'register-form') {
            e.preventDefault();
            console.log("📤 جاري إرسال نموذج التسجيل...");
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
            console.log("📤 جاري إرسال نموذج تسجيل الدخول...");
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            await auth.login(username, password);
        }
    });

    // 4. حفظ الأسئلة المخصصة (Create Page)
    contentDiv.addEventListener('click', async (e) => {
        // الضغط على زر حفظ الأسئلة أو أبوه (في حالة الأيقونة)
        if (e.target.closest('#save-questions-btn')) {
            if (!auth.isAuthenticated()) return;
            console.log("📥 جاري حفظ الأسئلة المخصصة...");
            
            // جمع الـ IDs للأسئلة المختارة
            const selectedQuestionIds = Array.from(document.querySelectorAll('.question-switcher:checked'))
                                            .map(cb => cb.value);

            if (selectedQuestionIds.length === 0) {
                ui.showToast('تنبيه', 'برجاء اختيار سؤال واحد على الأقل للاستبيان.', 'warning');
                return;
            }

            // تصفية المصفوفة الافتراضية بناءً على المختار
            const selectedQuestions = defaultQuestionsPool.filter(q => selectedQuestionIds.includes(q.id));
            
            const user = auth.getCurrentUser();
            const success = await dbOps.saveUserQuestions(user.uid, selectedQuestions);
            
            if (success) {
                router.navigate('/share');
            }
        }
    });

    // 5. إرسال استبيان المشارك (Survey Page)
    contentDiv.addEventListener('submit', async (e) => {
        if (e.target.id === 'survey-form') {
            e.preventDefault();
            console.log("📤 جاري إرسال استبيان المشارك...");
            
            // الحصول على الـ targetUserId من الرابط الحالي
            const path = window.location.pathname;
            const targetUserId = path.substring(3); // يستخرج ID بعد `/r/`

            // تجميع الإجابات من الاستبيان
            const answersObj = {};
            const surveyInputs = document.querySelectorAll('.survey-input');
            
            let allSliderAndMultipleAnswered = true;

            surveyInputs.forEach(input => {
                // التعامل مع Radio Buttons (الاختيار المتعدد)
                if (input.type === 'radio') {
                    if (input.checked) {
                        answersObj[input.name] = input.value;
                    }
                } 
                // التعامل مع الـ Slider والنص (Text)
                else {
                    if (input.value.trim() !== "") {
                         answersObj[input.name] = input.value;
                    } else if (input.hasAttribute('required') && !input.classList.contains('slider-input')) {
                        // النص الحر الإلزامي لم يتم ملؤه
                        allSliderAndMultipleAnswered = false; 
                    }
                }
            });

            // تحقق إضافي لأسئلة الاختيار المتعدد (أن يكون كل سؤال تم اختيار خيار له)
            const radioNames = new Set(Array.from(document.querySelectorAll('input[type="radio"].survey-input')).map(r => r.name));
            for(let name of radioNames) {
                if(!answersObj[name]) allSliderAndMultipleAnswered = false;
            }

            if(!allSliderAndMultipleAnswered) {
                 ui.showToast('تنبيه', 'يرجى الإجابة على جميع أسئلة الاختيار المتعدد والمقياس.', 'warning');
                 return;
            }

            const anonymousMessage = document.getElementById('anonymous-message').value;

            // إرسال الإجابات لقاعدة البيانات
            const success = await dbOps.submitResponse(targetUserId, answersObj, anonymousMessage);
            
            if (success) {
                ui.renderThankYou();
            }
        }
    });
});

// -- استماع لأحداث الواجهة الخاصة (المحقونة في utils.js) --

// 1. تسجيل الخروج (من الهيدر)
document.addEventListener('logoutTriggered', () => {
    auth.logout();
});

// 2. تفعيل تحليل AI (Results Page)
document.addEventListener('chartsInitialized', () => {
    const aiBtn = document.getElementById('get-ai-analysis-btn');
    if (!aiBtn) return; // تأكد أن الزر موجود في الـ DOM

    aiBtn.addEventListener('click', async () => {
        if (!auth.isAuthenticated()) return;
        
        console.log("🤖 جاري طلب تحليل الذكاء الاصطناعي...");
        const user = auth.getCurrentUser();
        const aiLoader = document.getElementById('ai-loader');
        const placeholder = document.getElementById('ai-placeholder-text');
        const analysisContent = document.getElementById('ai-analysis-content');

        // تحديث الواجهة لبدء التحميل
        aiBtn.classList.add('d-none');
        placeholder.classList.add('d-none');
        aiLoader.classList.remove('d-none');
        analysisContent.classList.remove('d-none'); // تأكد من إظهار الحاوية

        try {
            // جلب البيانات مجدداً للتأكد من حداثتها للتحليل
            const userData = await dbOps.getUserPublicData(user.uid);
            const responses = await dbOps.getUserResponses(user.uid);

            // إرسال طلب إلى Vercel Serverless Function لطلب التحليل
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

            // عرض النص النهائي القادم من الذكاء الاصطناعي
            ui.renderAiAnalysisText(data.analysis);
            ui.showToast('نجاح', 'تم إعداد تقريرك بالذكاء الاصطناعي.', 'success');

        } catch (error) {
            console.error("AI Analysis Error:", error);
            ui.showToast('خطأ', 'حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. حاول مرة أخرى.', 'danger');
            // إعادة الواجهة لحالتها السابقة في حالة الخطأ
            aiBtn.classList.remove('d-none');
            aiLoader.classList.add('d-none');
            placeholder.classList.remove('d-none');
        }
    });
});
