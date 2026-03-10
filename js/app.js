// filename: js/ui.js
import { defaultQuestionsPool, utils } from './utils.js';

// عناصر واجهة ثابتة
const contentDiv = document.getElementById('app-content');
const loaderDiv = document.getElementById('main-loader');
const navBar = document.getElementById('main-nav');
const navUsername = document.getElementById('nav-username');
const toastElement = document.getElementById('liveToast');
const logoutBtn = document.getElementById('logout-btn');

export const ui = {
    // إدارة شاشة التحميل
    showLoader: () => loaderDiv.classList.remove('fade-out'),
    hideLoader: () => loaderDiv.classList.add('fade-out'),

    // تحديث الهيدر بناءً على حالة الحزم
    updateNav: (userSession) => {
        if (userSession) {
            navBar.classList.remove('d-none');
            navUsername.textContent = userSession.displayName;
            navUsername.classList.remove('d-none');
        } else {
            navBar.classList.add('d-none');
        }
    },

    // عرض التنبيهات (Toasts)
    showToast: (title, message, type = 'primary') => {
        document.getElementById('toast-title').textContent = title;
        document.getElementById('toast-message').textContent = message;
        toastElement.className = `toast align-items-center text-white bg-${type} border-0`;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    },

    // --- قوالب الصفحات (HTML Templates) ---

    // 1. صفحة البداية (Home) - [تم التعديل]
    renderHome: (isAuthenticated) => {
        contentDiv.innerHTML = `
            <div class="text-center py-5 page-fade-in">
                <i class="fas fa-eye fa-5x text-primary mb-4"></i>
                <h1 class="display-4 fw-bold">ماذا يرى الناس فيك؟</h1>
                <p class="lead text-muted mb-5">اكتشف الانطباع الحقيقي الذي تتركه لدى أصدقائك وعائلتك. صراحة تامة، سرية مطلقة، وتحليل دقيق لشخصيتك.</p>
                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    ${isAuthenticated 
                        ? `<button id="home-share-btn" class="btn btn-primary btn-lg px-5">صفحة المشاركة</button>
                           <button id="home-results-btn" class="btn btn-outline-secondary btn-lg px-5">عرض النتائج</button>`
                        : `<button id="home-register-btn" class="btn btn-primary btn-lg px-5">ابدأ الآن - مجاناً</button>
                           <button id="home-login-btn" class="btn btn-outline-secondary btn-lg px-5">تسجيل الدخول</button>`
                    }
                </div>
                <div class="row mt-5 pt-5 text-start">
                    <div class="col-md-4 mb-3">
                        <div class="card h-100 p-3"><div class="card-body">
                            <i class="fas fa-user-secret fa-2x text-success mb-3"></i>
                            <h5 class="fw-bold">سرية تامة</h5><p class="small text-muted">لن تعرف هوية من قيمك أبداً. فقط الإجابات الصريحة.</p>
                        </div></div>
                    </div>
                     <div class="col-md-4 mb-3">
                        <div class="card h-100 p-3"><div class="card-body">
                            <i class="fas fa-chart-pie fa-2x text-primary mb-3"></i>
                            <h5 class="fw-bold">تحليل دقيق</h5><p class="small text-muted">نحول الإجابات إلى نسب مئوية ومخططات بيانية سهلة الفهم.</p>
                        </div></div>
                    </div>
                     <div class="col-md-4 mb-3">
                        <div class="card h-100 p-3"><div class="card-body">
                            <i class="fas fa-brain fa-2x text-warning mb-3"></i>
                            <h5 class="fw-bold">تحليل AI عميق</h5><p class="small text-muted">احصل على تحليل شخصية مفصل آمنياً وبناءً على منظور الآخرين.</p>
                        </div></div>
                    </div>
                </div>
            </div>
        `;
    },

    // 2. صفحة التسجيل
    renderRegister: () => {
        contentDiv.innerHTML = `
            <div class="row justify-content-center page-fade-in">
                <div class="col-md-6 col-lg-5">
                    <div class="card p-4">
                        <div class="card-body">
                            <h3 class="card-title text-center fw-bold mb-4">إنشاء حساب جديد</h3>
                            <form id="register-form">
                                <div class="mb-3">
                                    <label class="form-label">الاسم الكامل (الذي سيظهر للناس)</label>
                                    <input type="text" id="reg-display-name" class="form-control" placeholder="مثلاً: أحمد محمد" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">اسم المستخدم (بالإنجليزي، فريد)</label>
                                    <input type="text" id="reg-username" class="form-control" placeholder="ahmed_123" required pattern="^[a-zA-Z0-9_]+$">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">كلمة المرور</label>
                                    <input type="password" id="reg-password" class="form-control" required minlength="4">
                                </div>
                                <button type="submit" class="btn btn-primary w-100 btn-lg mt-3">إنشاء الحساب</button>
                            </form>
                            <div class="text-center mt-4">
                                <p class="small text-muted">لديك حساب بالفعل؟ <a href="/login" id="to-login-link">سجل دخولك</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // 3. صفحة تسجيل الدخول
    renderLogin: () => {
        contentDiv.innerHTML = `
            <div class="row justify-content-center page-fade-in">
                <div class="col-md-6 col-lg-5">
                    <div class="card p-4">
                        <div class="card-body">
                            <h3 class="card-title text-center fw-bold mb-4">تسجيل الدخول</h3>
                            <form id="login-form">
                                <div class="mb-3">
                                    <label class="form-label">اسم المستخدم</label>
                                    <input type="text" id="login-username" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">كلمة المرور</label>
                                    <input type="password" id="login-password" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 btn-lg mt-3">دخول</button>
                            </form>
                            <div class="text-center mt-4">
                                <p class="small text-muted">ليس لديك حساب؟ <a href="/register" id="to-register-link">أنشئ حساباً الآن</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // 4. صفحة تخصيص الأسئلة (Create)
    renderCreate: (existingQuestions) => {
        contentDiv.innerHTML = `
            <div class="page-fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <h2 class="fw-bold"><i class="fas fa-list-check text-primary me-2"></i>خصص استبيانك</h2>
                    <button id="save-questions-btn" class="btn btn-success"><i class="fas fa-save me-2"></i>حفظ الأسئلة وتوليد الرابط</button>
                </div>
                <div id="questions-constructor" class="row">
                    ${defaultQuestionsPool.map((q, index) => `
                        <div class="col-md-6 mb-3">
                            <div class="card h-100 shadow-sm border ${existingQuestions.some(eq => eq.id === q.id) ? 'border-primary' : ''}">
                                <div class="card-body d-flex align-items-center">
                                    <div class="form-check form-switch me-3">
                                        <input class="form-check-input question-switcher" type="checkbox" id="switch-${q.id}" value="${q.id}" ${existingQuestions.some(eq => eq.id === q.id) ? 'checked' : ''}>
                                    </div>
                                    <div>
                                        <h6 class="mb-1 fw-bold">${q.text}</h6>
                                        <span class="badge bg-light text-muted small">${q.type === 'slider' ? 'مقياس 0-100' : q.type === 'multiple' ? 'اختيار متعدد' : 'نص حر'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // 5. صفحة المشاركة (Share)
    renderShare: (userId) => {
        const link = utils.generateShareLink(userId);
        const shareText = `هذا الرابط سري تماماً! قيموني هنا ولن أعرف هويتكم: ${link}`;
        contentDiv.innerHTML = `
            <div class="text-center py-5 page-fade-in">
                <div class="card p-5 shadow border-0">
                    <i class="fas fa-share-alt fa-4x text-success mb-4"></i>
                    <h2 class="fw-bold mb-3">رابطك جاهز للانطلاق!</h2>
                    <div class="input-group mb-4 shadow-sm" dir="ltr">
                        <input type="text" class="form-control form-control-lg text-center bg-white" value="${link}" readonly id="share-link-input">
                        <button class="btn btn-primary px-4" type="button" id="copy-link-btn">
                            <i class="fas fa-copy"></i> نسخ
                        </button>
                    </div>
                    <div class="d-flex justify-content-center gap-3 flex-wrap">
                        <button class="btn btn-success btn-lg px-4" id="share-whatsapp-btn">
                            <i class="fab fa-whatsapp me-2"></i> مشاركة عبر واتساب
                        </button>
                        <button class="btn btn-outline-primary" id="to-results-btn">
                            <i class="fas fa-chart-bar me-2"></i> عرض النتائج الحالية
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // 6. صفحة الأسئلة للمشاركين (Survey)
    renderSurvey: (ownerName, questions) => {
        if (!questions || questions.length === 0) {
            contentDiv.innerHTML = `<div class="alert alert-warning text-center">لم يقم ${ownerName} بتفعيل أي أسئلة بعد.</div>`;
            return;
        }
        contentDiv.innerHTML = `
            <div class="page-fade-in pb-5">
                <div class="text-center mb-5">
                    <div class="badge bg-primary px-3 py-2 mb-2">منظوري</div>
                    <h2 class="fw-bold">كيف ترى <span class="text-primary">${ownerName}</span>؟</h2>
                    <p class="text-muted small">تقييمك سري تماماً ولن يعرف هويتك أبداً.</p>
                </div>
                <form id="survey-form">
                    ${questions.map((q, index) => `
                        <div class="card mb-4 shadow-sm">
                            <div class="card-body p-4">
                                <h5 class="fw-bold mb-3">${index + 1}. ${q.text}</h5>
                                ${q.type === 'slider' ? `
                                    <div class="d-flex justify-content-between small text-muted mb-1">
                                        <span>${q.labels[0]}</span><span>${q.labels[1]}</span><span>${q.labels[2]}</span>
                                    </div>
                                    <input type="range" class="form-range survey-input slider-input" min="0" max="100" step="10" value="50" name="${q.id}" id="input-${q.id}" required>
                                    <div class="text-center mt-2 slider-value"><span id="val-${q.id}">50</span> / 100</div>
                                ` : q.type === 'multiple' ? `
                                    <div class="row">
                                        ${q.options.map(opt => `
                                            <div class="col-sm-6 mb-2">
                                                <input type="radio" class="btn-check survey-input" name="${q.id}" id="opt-${q.id}-${utils.hash(opt)}" value="${opt}" required>
                                                <label class="btn btn-outline-primary w-100 text-start" for="opt-${q.id}-${utils.hash(opt)}">${opt}</label>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : `
                                    <textarea class="form-control survey-input" name="${q.id}" rows="3" placeholder="اكتب رأيك بصراحة..." required></textarea>
                                `}
                            </div>
                        </div>
                    `).join('')}
                    <div class="card mb-4 border-success">
                        <div class="card-body p-4 bg-white shadow-sm" style="border-radius: 10px;">
                            <h5 class="fw-bold mb-3 text-success"><i class="fas fa-envelope-open me-2"></i>رسالة قصيرة مجهولة (اختياري)</h5>
                            <textarea class="form-control" id="anonymous-message" rows="4" placeholder="شيء تود قوله له/لها بصراحة دون أن يعرف هويتك..."></textarea>
                        </div>
                    </div>
                    <div class="text-center d-grid d-sm-block mt-5">
                        <button type="submit" class="btn btn-success btn-lg px-5">
                            <i class="fas fa-paper-plane me-2"></i> إرسال التقييم بسرية
                        </button>
                    </div>
                </form>
            </div>
        `;
        // تفعيل تحديث قيمة الـ Slider ديناميكياً
        document.querySelectorAll('.slider-input').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const valueSpan = document.getElementById(`val-${e.target.name}`);
                if (valueSpan) valueSpan.textContent = e.target.value;
            });
        });
    },

    // 7. صفحة شكراً بعد الإرسال
    renderThankYou: () => {
        contentDiv.innerHTML = `
            <div class="text-center py-5 page-fade-in">
                <i class="fas fa-check-circle fa-5x text-success mb-4"></i>
                <h1 class="fw-bold">شكراً لك!</h1>
                <p class="lead text-muted mb-4">تم إرسال تقييمك بنجاح وبسرية تامة.</p>
                <button class="btn btn-primary btn-lg" id="home-btn">جرب التطبيق بنفسك</button>
            </div>
        `;
    },

    // 8. صفحة النتائج (Results) للمستخدم الرئيسي
    renderResults: (analysis) => {
        if (!analysis || analysis.totalResponses === 0) {
            contentDiv.innerHTML = `
                <div class="text-center py-5 page-fade-in">
                    <i class="fas fa-hourglass-start fa-4x text-muted mb-4"></i>
                    <h2 class="fw-bold">لا توجد إجابات بعد</h2>
                    <p class="text-muted">يبدو أنك لم تحصل على أي تقييمات حتى الآن. شارك الرابط مع أصدقائك.</p>
                    <button class="btn btn-success" id="to-share-btn"><i class="fas fa-share-alt me-2"></i>صفحة المشاركة</button>
                </div>
            `;
            return;
        }

        const messagesCount = analysis.messages.length;

        contentDiv.innerHTML = `
            <div class="page-fade-in pb-5">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <h2 class="fw-bold"><i class="fas fa-chart-bar text-primary me-2"></i>تحليل شخصيتك (بناءً على ${analysis.totalResponses} رأي)</h2>
                    <button class="btn btn-outline-success btn-sm" id="to-share-btn-2"><i class="fas fa-plus me-1"></i>احصل على المزيد من الآراء</button>
                </div>

                <div class="card border-0 shadow bg-white mb-5">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="fw-bold text-success mb-0"><i class="fas fa-robot me-2"></i>تحليل منظوري العميق (AI)</h5>
                            <button id="get-ai-analysis-btn" class="btn btn-primary btn-sm">
                                <i class="fas fa-brain me-1"></i> ابدأ التحليل الآن
                            </button>
                        </div>
                        
                        <div id="ai-analysis-content" class="text-muted leading-relaxed">
                            <div class="text-center py-4 d-none" id="ai-loader">
                                <div class="spinner-border text-success" role="status"></div>
                                <p class="mt-2 small text-muted">جاري الاتصال بالذكاء الاصطناعي...</p>
                            </div>
                            <p class="mb-0 text-center placeholder-glow" id="ai-placeholder-text">
                                اضغط على زر "ابدأ التحليل" أعلاه للحصول على تقرير مفصل وآمن لشخصيتك.</p>
                        </div>
                    </div>
                </div>

                <h4 class="fw-bold mb-3">متوسط نسب الصفات</h4>
                <div class="row">
                    ${Object.values(analysis.sliderAverages).map(item => `
                        <div class="col-md-6 mb-4">
                            <div class="card h-100 shadow-sm border-0">
                                <div class="card-body p-3">
                                    <h6 class="fw-bold mb-2" style="font-size: 0.9rem;">${item.text}</h6>
                                    <div class="d-flex align-items-center">
                                        <div class="progress flex-grow-1" style="height: 12px; border-radius: 10px; background-color: #e9ecef;">
                                            <div class="progress-bar ${item.avg > 70 ? 'bg-success' : item.avg > 40 ? 'bg-primary' : 'bg-danger'}" role="progressbar" style="width: ${item.avg}%" aria-valuenow="${item.avg}" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <span class="ms-3 fw-bold text-primary" style="font-size: 1.1rem; min-width: 50px; text-align: left;">${item.avg}%</span>
                                    </div>
                                    <div class="d-flex justify-content-between small text-muted mt-1" style="font-size: 0.75rem;">
                                        <span>منخفض</span><span>متوسط</span><span>مرتفع</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    ${Object.values(analysis.sliderAverages).length === 0 ? '<div class="col-12 text-center text-muted">لا توجد إجابات رقمية بعد.</div>' : ''}
                </div>

                <h4 class="fw-bold mt-4 mb-3">توزيع الاختيارات</h4>
                <div class="row id="charts-container">
                    ${Object.keys(analysis.multipleCharts).map(qId => `
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100 shadow-sm border-0 p-3">
                                <h6 class="fw-bold mb-3 text-center" style="font-size: 0.85rem; min-height: 40px;">${analysis.multipleCharts[qId].text}</h6>
                                <div style="height: 200px;"><canvas id="chart-${qId}"></canvas></div>
                            </div>
                        </div>
                    `).join('')}
                    ${Object.keys(analysis.multipleCharts).length === 0 ? '<div class="col-12 text-center text-muted">لا توجد إجابات على أسئلة الاختيار المتعدد بعد.</div>' : ''}
                </div>

                <h4 class="fw-bold mt-4 mb-3">الإجابات النصية الصريحة</h4>
                <div class="row">
                     ${analysis.textResponses.map(item => `
                        <div class="col-12 mb-3">
                            <div class="card shadow-sm border-0">
                                <div class="card-header bg-white"><h6 class="mb-0 fw-bold text-primary" style="font-size: 0.9rem;">${item.questionText}</h6></div>
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        ${item.answers.map(ans => `
                                            <li class="list-group-item d-flex align-items-center p-3 border-0 bg-light mb-2" style="border-radius: 10px;">
                                                <i class="fas fa-quote-right text-muted me-3 fa-xs"></i>
                                                <p class="mb-0 small leading-relaxed">${ans}</p>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                     `).join('')}
                     ${analysis.textResponses.length === 0 ? '<div class="col-12 text-center text-muted">لا توجد إجابات نصية بعد.</div>' : ''}
                </div>

                <h4 class="fw-bold mt-4 mb-3">الرسائل المجهولة (${messagesCount})</h4>
                <div class="row">
                    ${analysis.messages.map(msg => `
                        <div class="col-md-6 col-lg-4 mb-3">
                            <div class="card bg-light h-100 shadow-sm border-0">
                                <div class="card-body p-4 d-flex flex-column">
                                    <i class="fas fa-envelope-open text-success mb-3 fa-lg"></i>
                                    <p class="mb-3 leading-relaxed" style="font-size: 0.85rem; flex-grow: 1;">${msg.text}</p>
                                    <footer class="blockquote-footer small text-muted mt-auto" style="font-size: 0.7rem;">${utils.formatDate(msg.time)}</footer>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                     ${messagesCount === 0 ? '<div class="col-12 text-center text-muted">لم تصلك أي رسائل نصية بعد.</div>' : ''}
                </div>

            </div>
        `;
        // تفعيل المخططات البيانية واستدعاء الـ Event لربط زر AI
        utils.initCharts(analysis.multipleCharts);
    },

    // دالة مساعدة لعرض نص التحليل النهائي القادم من AI
    renderAiAnalysisText: (text) => {
        const content = document.getElementById('ai-analysis-content');
        if (!content) return;

        // تحويل النص البسيط القادم من AI إلى HTML بسيط (عناوين وفقرات)
        const formattedHtml = text.split('\n')
                                 .filter(line => line.trim())
                                 .map(line => {
                                     if (line.startsWith('**') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.')) {
                                         return `<h6 class="fw-bold text-primary mt-3 mb-2">${line.replace(/^\*+|^\d+\.\s+/, '')}</h6>`;
                                     }
                                     return `<p class="mb-2 small leading-relaxed text-muted">${line}</p>`;
                                 }).join('');
        content.innerHTML = `<div class="p-2">${formattedHtml}</div>`;
    },

    render404: () => {
        contentDiv.innerHTML = `<div class="text-center py-5"><h1>404</h1><p>الصفحة غير موجودة.</p></div>`;
    }
};
