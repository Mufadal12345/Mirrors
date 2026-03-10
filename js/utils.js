// filename: js/utils.js

// --- بيانات ثابتة (الأسئلة الافتراضية الـ 30) ---
export const defaultQuestionsPool = [
    // نوع: Slider (0-100)
    { id: 'q1', text: 'ما مدى ثقتي بنفسي في نظرك؟', type: 'slider', category: 'confidence', labels: ['منعدمة', 'متوسطة', 'عالية جداً'] },
    { id: 'q2', text: 'إلى أي درجة تعتقد أنني شخص صادق؟', type: 'slider', category: 'integrity', labels: ['كاذب', 'صادق أحياناً', 'صادق تماماً'] },
    { id: 'q3', text: 'ما مستوى ذكائي الاجتماعي في التعامل مع الآخرين؟', type: 'slider', category: 'intelligence', labels: ['ضعيف', 'جيد', 'عبقري'] },
    { id: 'q4', text: 'مدى قدرتي على تحمل المسؤولية؟', type: 'slider', category: 'responsibility', labels: ['متهرب', 'متحمل', 'قيادي'] },
    { id: 'q5', text: 'إلى أي حد أنا شخص مرح وممتع؟', type: 'slider', category: 'spirit', labels: ['ممل', 'لطيف', 'روح الحفلة'] },
    { id: 'q6', text: 'ما مستوى طموحي في الحياة؟', type: 'slider', category: 'ambition', labels: ['كسول', 'طموح', 'شديد الطموح'] },
    { id: 'q7', text: 'ما مدى قدرتي على الابتكار وتقديم أفكار جديدة؟', type: 'slider', category: 'intelligence', labels: ['تقليدي', 'مبتكر', 'مبدع جداً'] },
    { id: 'q8', text: 'ما مدى اهتمامي بمشاعر الآخرين في نظرك؟', type: 'slider', category: 'spirit', labels: ['غير مكترث', 'متعاطف', 'حساس جداً'] },
    { id: 'q9', text: 'ما مستوى قدرتي على حل المشكلات؟', type: 'slider', category: 'intelligence', labels: ['عاجز', 'فعّال', 'أحل أعقد الأمور'] },
    { id: 'q10', text: 'ما مدى حماسي في نظرك؟', type: 'slider', category: 'ambition', labels: ['محبط', 'متحمس', 'شعلة نشاط'] },
    
    // نوع: Multiple Choice (تأكد من أن الخيارات فريدة)
    { id: 'q11', text: 'ما هي صفتي الأبرز عند الغضب؟', type: 'multiple', options: ['أصمت تماماً', 'أصرخ وأنفجر', 'أناقش بهدوء', 'أنسحب من الموقف'] },
    { id: 'q12', text: 'كيف تراني في اتخاذ القرارات؟', type: 'multiple', options: ['متسرع جداً', 'متردد كثيراً', 'حازم ومنطقي', 'أعتمد على عاطفتي'] },
    { id: 'q13', text: 'ما هو انطباعك الأول عني عادة؟', type: 'multiple', options: ['مغرور ومتكبر', 'خجول وانطوائي', 'ودود ومنفتح', 'غريب الأطوار'] },
    { id: 'q14', text: 'في رأيك، ما هي أكبر نقاط قوتي؟', type: 'multiple', options: ['الذكاء', 'الطيبة', 'الشجاعة', 'الصبر'] },
    { id: 'q15', text: 'ما هو دوري الغالب في المجموعة؟', type: 'multiple', options: ['القائد', 'المستمع', 'المهرج', 'الناقد'] },
    { id: 'q16', text: 'ما هي الطريقة الأفضل للتعامل معي؟', type: 'multiple', options: ['بالصراحة المباشرة', 'باللباقة', 'بالفكاهة', 'بعدم الضغط'] },
    { id: 'q17', text: 'ما هي صفتي الأبرز في المناقشات؟', type: 'multiple', options: ['مستمع جيد', 'أفرض رأيي', 'أبحث عن حل وسط', 'سريع الملل'] },
    { id: 'q18', text: 'ما هي أكبر مخاوفي في نظرك؟', type: 'multiple', options: ['الفشل', 'الوحدة', 'المرض', 'فقدان الاحترام'] },
    { id: 'q19', text: 'كيف أتعامل مع النجاح؟', type: 'multiple', options: ['بتواضع', 'بغزور', 'بمشاركة الجميع', 'بكتمان'] },
    { id: 'q20', text: 'ما هو انطباعك عن مظهري العام؟', type: 'multiple', options: ['أنيق ومرتب', 'بسيط', 'لا أهتم كثيراً', 'مميز وغريب'] },
    
    // نوع: Text
    { id: 'q21', text: 'ما هي الكلمة الوحيدة التي تصفني بها؟', type: 'text' },
    { id: 'q22', text: 'ما هو أجمل ذكرى تجمعنا؟', type: 'text' },
    { id: 'q23', text: 'ما هو أكثر ما يعجبك في شخصيتي؟', type: 'text' },
    { id: 'q24', text: 'ما هو أكثر ما يضايقك في شخصيتي؟', type: 'text' },
    { id: 'q25', text: 'في رأيك، ما هي الموهبة التي يجب أن أطورها؟', type: 'text' },
    { id: 'q26', text: 'ما هو الشيء الذي يجب أن أغيره في نفسي؟', type: 'text' },
    { id: 'q27', text: 'ما هو أكثر ما يميزني عن غيري؟', type: 'text' },
    { id: 'q28', text: 'ما هو الانطباع الذي تعتقد أنني أتركه لدى الآخرين؟', type: 'text' },
    { id: 'q29', text: 'ما هو الشيء الذي ترغب في قوله لي ولكني لا أحب سماعه؟', type: 'text' },
    { id: 'q30', text: 'رسالة سريعة مجهولة إلى صاحب الحساب... (غير الرسالة الاختيارية في النهاية)', type: 'text' }
];

// --- عناصر واجهة ثابتة ---
const contentDiv = document.getElementById('app-content');
const loaderDiv = document.getElementById('main-loader');
const navBar = document.getElementById('main-nav');
const navUsername = document.getElementById('nav-username');
const toastElement = document.getElementById('liveToast');
const logoutBtn = document.getElementById('logout-btn');

// --- تصدير كائن UI للتحكم في الواجهة ---
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

    // 1. صفحة البداية (Home)
    renderHome: (isAuthenticated) => {
        contentDiv.innerHTML = `
            <div class="text-center py-5 page-fade-in">
                <i class="fas fa-eye fa-5x text-primary mb-4"></i>
                <h1 class="display-4 fw-bold">ماذا يرى الناس فيك؟</h1>
                <p class="lead text-muted mb-5">اكتشف الانطباع الحقيقي الذي تتركه لدى أصدقائك وعائلتك. صراحة تامة، سرية مطلقة، وتحليل دقيق لشخصيتك.</p>
                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    ${isAuthenticated 
                        ? `<button class="btn btn-primary btn-lg px-5" onclick="router.navigate('/share')">صفحة المشاركة</button>
                           <button class="btn btn-outline-secondary btn-lg px-5" onclick="router.navigate('/results')">عرض النتائج</button>`
                        : `<button class="btn btn-primary btn-lg px-5" onclick="router.navigate('/register')">ابدأ الآن - مجاناً</button>
                           <button class="btn btn-outline-secondary btn-lg px-5" onclick="router.navigate('/login')">تسجيل الدخول</button>`
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
                            <i class="fas fa-robot fa-2x text-warning mb-3"></i>
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
                                <p class="small text-muted">لديك حساب بالفعل؟ <a href="/login" onclick="router.navigate('/login'); return false;">سجل دخولك</a></p>
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
                                <p class="small text-muted">ليس لديك حساب؟ <a href="/register" onclick="router.navigate('/register'); return false;">أنشئ حساباً الآن</a></p>
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
                <div class="alert alert-info small">
                    اختر الأسئلة التي تريد أن يراها أصدقاؤك. لقد قمنا بإعداد 30 سؤالاً مميزاً، يمكنك تفعيل ما تشاء منها. كلما نوعت في الأسئلة، كان التحليل أدق.
                </div>
                <div id="questions-constructor" class="row">
                    ${defaultQuestionsPool.map((q, index) => `
                        <div class="col-md-6 mb-3">
                            <div class="card h-100 shadow-sm border ${existingQuestions.some(eq => eq.id === q.id) ? 'border-primary bg-light' : ''}">
                                <div class="card-body d-flex align-items-center p-3">
                                    <div class="form-check form-switch me-3">
                                        <input class="form-check-input question-switcher" type="checkbox" id="switch-${q.id}" value="${q.id}" ${existingQuestions.some(eq => eq.id === q.id) ? 'checked' : ''}>
                                    </div>
                                    <div>
                                        <h6 class="mb-1 fw-bold">${q.text}</h6>
                                        <span class="badge bg-white text-muted small border">${q.type === 'slider' ? 'مقياس 0-100' : q.type === 'multiple' ? 'اختيار متعدد' : 'نص حر'}</span>
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
        const shareText = `هذا الرابط سري تماماً! دخلت تطبيق (منظوري) لأعرف كيف تروني بصراحة. قيموني هنا ولن أعرف هويتكم: ${link}`;
        
        contentDiv.innerHTML = `
            <div class="text-center py-5 page-fade-in">
                <div class="card p-5 shadow border-0">
                    <i class="fas fa-share-alt fa-4x text-success mb-4"></i>
                    <h2 class="fw-bold mb-3">رابطك جاهز للانطلاق!</h2>
                    <p class="text-muted mb-4">انشر هذا الرابط بين أصدقائك، في مجموعات الواتساب، أو الستوري. كلما زادت الإجابات، كان التحليل أدق.</p>
                    
                    <div class="input-group mb-4 shadow-sm" dir="ltr">
                        <input type="text" class="form-control form-control-lg text-center bg-white" value="${link}" readonly id="share-link-input">
                        <button class="btn btn-primary px-4" type="button" onclick="utils.copyToClipboard('${link}')">
                            <i class="fas fa-copy"></i> نسخ
                        </button>
                    </div>

                    <div class="d-flex justify-content-center gap-3 flex-wrap">
                        <button class="btn btn-success btn-lg px-4" onclick="utils.shareWhatsApp('${shareText}')">
                            <i class="fab fa-whatsapp me-2"></i> مشاركة عبر واتساب
                        </button>
                        <button class="btn btn-outline-primary" onclick="router.navigate('/results')">
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
                    <p class="text-muted small">تقييمك سري تماماً ولن يعرف هويتك أبداً. كن صادقاً.</p>
                </div>
                
                <form id="survey-form">
                    ${questions.map((q, index) => `
                        <div class="card mb-4 shadow-sm">
                            <div class="card-body p-4">
                                <h5 class="fw-bold mb-3">${index + 1}. ${q.text}</h5>
                                
                                ${q.type === 'slider' ? `
                                    <div class="d-flex justify-content-between small text-muted mb-1">
                                        <span>${q.labels[0]}</span>
                                        <span>${q.labels[1]}</span>
                                        <span>${q.labels[2]}</span>
                                    </div>
                                    <input type="range" class="form-range survey-input slider-input" min="0" max="100" step="10" value="50" name="${q.id}" id="input-${q.id}" required>
                                    <div class="text-center mt-2 slider-value"><span id="val-${q.id}">50</span> / 100</div>
                                ` : q.type === 'multiple' ? `
                                    <div class="row">
                                        ${q.options.map(opt => `
                                            <div class="col-sm-6 mb-2">
                                                <input type="radio" class="btn-check survey-input multiple-input" name="${q.id}" id="opt-${q.id}-${utils.hash(opt)}" value="${opt}" required>
                                                <label class="btn btn-outline-primary w-100 text-start" for="opt-${q.id}-${utils.hash(opt)}">${opt}</label>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : `
                                    <textarea class="form-control survey-input text-input" name="${q.id}" rows="3" placeholder="اكتب رأيك بصراحة..." required></textarea>
                                `}
                            </div>
                        </div>
                    `).join('')}

                    <div class="card mb-4 border-success bg-white shadow-sm">
                        <div class="card-body p-4">
                            <h5 class="fw-bold mb-3 text-success"><i class="fas fa-envelope-open me-2"></i>رسالة قصيرة مجهولة (اختياري)</h5>
                            <textarea class="form-control" id="anonymous-message" rows="4" placeholder="شيء تود قوله له/لها دون أن يعرف هويتك..."></textarea>
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
                document.getElementById(`val-${e.target.name}`).textContent = e.target.value;
            });
        });
    },

    // 7. صفحة شكراً بعد الإرسال
    renderThankYou: () => {
        contentDiv.innerHTML = `
            <div class="text-center py-5 page-fade-in">
                <i class="fas fa-check-circle fa-5x text-success mb-4"></i>
                <h1 class="fw-bold">شكراً لك!</h1>
                <p class="lead text-muted mb-4">تم إرسال تقييمك بنجاح وبسرية تامة. سيتمكن صديقك من رؤية النتائج والرسالة مجهولة الهوية دون معرفة أنك المرسل.</p>
                <button class="btn btn-primary btn-lg" onclick="router.navigate('/')">جرب التطبيق بنفسك</button>
            </div>
        `;
    },

    // 8. صفحة النتائج (Results) للمستخدم الرئيسي (محدثة لاستخدام AI)
    renderResults: (analysis) => {
        if (!analysis || analysis.totalResponses === 0) {
            contentDiv.innerHTML = `
                <div class="text-center py-5 page-fade-in">
                    <i class="fas fa-hourglass-start fa-4x text-muted mb-4"></i>
                    <h2 class="fw-bold">لا توجد إجابات بعد</h2>
                    <p class="text-muted">يبدو أنك لم تحصل على أي تقييمات حتى الآن. شارك الرابط مع أصدقائك.</p>
                    <button class="btn btn-success" onclick="router.navigate('/share')"><i class="fas fa-share-alt me-2"></i>صفحة المشاركة</button>
                </div>
            `;
            return;
        }

        const messagesWithMessagesCount = analysis.messages.length;

        contentDiv.innerHTML = `
            <div class="page-fade-in pb-5">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <h2 class="fw-bold"><i class="fas fa-chart-bar text-primary me-2"></i>تحليل منظوري (بناءً على ${analysis.totalResponses} رأي)</h2>
                    <button class="btn btn-outline-success btn-sm" onclick="router.navigate('/share')"><i class="fas fa-plus me-1"></i>احصل على المزيد من الآراء</button>
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
                                <p class="mt-2 small text-muted">جاري الاتصال بالذكاء الاصطناعي... قد يستغرق ذلك دقيقة.</p>
                            </div>
                            <p class="mb-0 text-center" id="ai-placeholder-text">اضغط على زر "ابدأ التحليل" أعلاه للحصول على تقرير مفصل وآمن لبناء شخصيتك.</p>
                        </div>
                    </div>
                </div>

                <h4 class="fw-bold mb-3">متوسط نسب الصفات</h4>
                <div class="row mb-5">
                    ${Object.values(analysis.sliderAverages).map(item => `
                        <div class="col-md-6 mb-4">
                            <div class="card h-100 shadow-sm border-0">
                                <div class="card-body">
                                    <h6 class="fw-bold mb-2">${item.text}</h6>
                                    <div class="d-flex align-items-center">
                                        <div class="progress flex-grow-1" style="height: 15px; border-radius: 10px; background-color: #e9ecef;">
                                            <div class="progress-bar ${item.avg > 70 ? 'bg-success' : item.avg > 40 ? 'bg-primary' : 'bg-danger'}" role="progressbar" style="width: ${item.avg}%" aria-valuenow="${item.avg}" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <span class="ms-3 fw-bold text-primary" style="font-size: 1.2rem; min-width: 50px; text-align: left;">${item.avg}%</span>
                                    </div>
                                    <div class="d-flex justify-content-between small text-muted mt-1">
                                        <span>منخفض</span><span>متوسط</span><span>مرتفع</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    ${Object.values(analysis.sliderAverages).length === 0 ? '<div class="col-12 text-center text-muted">لا توجد إجابات رقمية بعد.</div>' : ''}
                </div>

                <h4 class="fw-bold mt-4 mb-3">توزيع الاختيارات</h4>
                <div class="row mb-5" id="charts-container">
                    ${Object.keys(analysis.multipleCharts).map(qId => `
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100 shadow-sm border-0 p-3">
                                <h6 class="fw-bold mb-3 text-center" style="font-size: 0.9rem;">${analysis.multipleCharts[qId].text}</h6>
                                <div style="height: 220px;"><canvas id="chart-${qId}"></canvas></div>
                            </div>
                        </div>
                    `).join('')}
                    ${Object.keys(analysis.multipleCharts).length === 0 ? '<div class="col-12 text-center text-muted">لا توجد إجابات على أسئلة الاختيار المتعدد بعد.</div>' : ''}
                </div>

                <h4 class="fw-bold mt-4 mb-3">الإجابات النصية الصريحة</h4>
                <div class="row mb-5">
                     ${analysis.textResponses.map(item => `
                        <div class="col-12 mb-3">
                            <div class="card shadow-sm border-0">
                                <div class="card-header bg-white"><h6 class="mb-0 fw-bold text-primary">${item.questionText}</h6></div>
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        ${item.answers.map(ans => `
                                            <li class="list-group-item d-flex align-items-center p-3 border-0 bg-light mb-2" style="border-radius: 10px;">
                                                <i class="fas fa-quote-right text-muted me-3"></i>
                                                <p class="mb-0 small">${ans}</p>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                     `).join('')}
                     ${analysis.textResponses.length === 0 ? '<div class="col-12 text-center text-muted">لا توجد إجابات نصية بعد.</div>' : ''}
                </div>

                <h4 class="fw-bold mt-4 mb-3">الرسائل المجهولة (${analysis.messages.length})</h4>
                <div class="row">
                    ${analysis.messages.map(msg => `
                        <div class="col-md-6 col-lg-4 mb-3">
                            <div class="card bg-light h-100 shadow-sm border-0">
                                <div class="card-body p-4 d-flex flex-column">
                                    <i class="fas fa-envelope-open text-success mb-3 fa-2x"></i>
                                    <p class="mb-3 leading-relaxed" style="font-size: 0.9rem; flex-grow: 1;">${msg.text}</p>
                                    <footer class="blockquote-footer small text-muted mt-auto" style="font-size: 0.75rem;">${utils.formatDate(msg.time)}</footer>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                     ${analysis.messages.length === 0 ? '<div class="col-12 text-center text-muted">لم تصلك أي رسائل نصية بعد.</div>' : ''}
                </div>

            </div>
        `;

        // تفعيل المخططات البيانية واستدعاء الـ Event لربط زر AI
        utils.initCharts(analysis.multipleCharts);
    },

    // دالة مساعدة لعرض نص التحليل النهائي القادم من AI
    renderAiAnalysisText: (text) => {
        const content = document.getElementById('ai-analysis-content');
        // تحويل النص البسيط القادم من AI إلى HTML بسيط (عناوين وفقرات)
        // هذا مجرد تحويل بسيط للتوضيح، يمكن توسيعه
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

// --- وظائف مساعدة (Utility Functions) ---
export const utils = {
    // تنسيق التاريخ
    formatDate: (date) => {
        return date.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    },

    // توليد هاش بسيط (لخيارات Multiple Choice)
    hash: (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; 
        }
        return Math.abs(hash).toString(16);
    },

    // توليد رابط المشاركة
    generateShareLink: (userId) => {
        return `${window.location.origin}/r/${userId}`;
    },

    // نسخ النص للمحفظة
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            ui.showToast('تم النسخ', 'تم نسخ الرابط إلى المحفظة، شاركه الآن!');
        }).catch(err => {
             console.error('Failed to copy: ', err);
             ui.showToast('خطأ', 'فشل نسخ الرابط، جرب نسخه يدوياً.', 'danger');
        });
    },

    // مشاركة عبر واتساب
    shareWhatsApp: (text) => {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    },

    // تحليل الإجابات وتوليد كائن التحليل
    analyzeResults: (questions, responses) => {
        if (!responses || responses.length === 0) return null;

        const analysis = {
            totalResponses: responses.length,
            sliderAverages: {}, // { qId: { text: '', avg: 0, category: '' } }
            multipleCharts: {}, // { qId: { text: '', data: { option: count } } }
            textResponses: [], // [ { questionText: '', answers: [] } ]
            messages: [] // [ { text: '', time: Date } ]
        };

        // 1. تصنيف الأسئلة للسهولة
        const questionsMap = {};
        questions.forEach(q => questionsMap[q.id] = q);

        // 2. معالجة الإجابات
        responses.forEach(resp => {
            // الرسائل المجهولة
            if (resp.anonymousMessage && resp.anonymousMessage.trim()) {
                analysis.messages.push({
                    text: resp.anonymousMessage,
                    time: resp.timestamp?.toDate() || new Date()
                });
            }

            // الإجابات على الأسئلة
            for (const [qId, value] of Object.entries(resp.answers)) {
                const question = questionsMap[qId];
                if (!question) continue;

                if (question.type === 'slider') {
                    if (!analysis.sliderAverages[qId]) {
                        analysis.sliderAverages[qId] = { text: question.text, total: 0, count: 0, category: question.category };
                    }
                    analysis.sliderAverages[qId].total += parseInt(value);
                    analysis.sliderAverages[qId].count++;
                } 
                else if (question.type === 'multiple') {
                    if (!analysis.multipleCharts[qId]) {
                        analysis.multipleCharts[qId] = { text: question.text, data: {} };
                        question.options.forEach(opt => analysis.multipleCharts[qId].data[opt] = 0);
                    }
                    if (analysis.multipleCharts[qId].data[value] !== undefined) {
                        analysis.multipleCharts[qId].data[value]++;
                    }
                }
                else if (question.type === 'text') {
                    let textQ = analysis.textResponses.find(t => t.questionText === question.text);
                    if (!textQ) {
                        textQ = { questionText: question.text, answers: [] };
                        analysis.textResponses.push(textQ);
                    }
                    if (value && value.trim()) {
                        textQ.answers.push(value);
                    }
                }
            }
        });

        // 3. حساب المعدلات النهائية للـ Sliders
        for (const qId in analysis.sliderAverages) {
            const item = analysis.sliderAverages[qId];
            item.avg = item.count > 0 ? Math.round(item.total / item.count) : 0;
        }

        return analysis;
    },

    // تفعيل المخططات البيانية باستخدام Chart.js
    initCharts: (chartsData) => {
        if (!window.Chart || Object.keys(chartsData).length === 0) return;
        
        // تأخير بسيط للتأكد من حقن العناصر في الـ DOM
        setTimeout(() => {
            Object.keys(chartsData).forEach(qId => {
                const chartInfo = chartsData[qId];
                const canvas = document.getElementById(`chart-${qId}`);
                if (!canvas) return;

                const ctx = canvas.getContext('2d');
                
                // تصفية الاختيارات التي لم يتم اختيارها مطلقاً (COUNT = 0) لجعل المخطط أنظف
                const labels = [];
                const data = [];
                for (const [opt, count] of Object.entries(chartInfo.data)) {
                    if (count > 0) {
                        labels.push(opt);
                        data.push(count);
                    }
                }

                // إذا كانت كل البيانات صفراً، لا ترسم
                if (data.length === 0) return;

                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: ['#4e73df', '#1cc88a', '#f6c23e', '#e74a3b', '#36b9cc', '#2e59d9', '#17a673'],
                            borderWidth: 1,
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                            legend: { 
                                position: 'bottom', 
                                labels: { 
                                    boxWidth: 12,
                                    padding: 10,
                                    font: { family: 'Cairo', size: 10 } 
                                } 
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const label = context.label || '';
                                        const value = context.parsed || 0;
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = Math.round((value / total) * 100);
                                        return `${label}: ${value} (${percentage}%)`;
                                    }
                                }
                            }
                        },
                        cutout: '60%' // يجعل الحلقي أنحف
                    }
                });
            });

            // إرسال Event لـ app.js لربط زر الـ AI
            document.dispatchEvent(new Event('chartsInitialized'));

        }, 150);
    }
};

// ربط زر تسجيل الخروج
logoutBtn.addEventListener('click', () => {
     document.dispatchEvent(new Event('logoutTriggered'));
});
