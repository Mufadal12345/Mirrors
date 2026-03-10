// filename: js/router.js
import { ui } from './utils.js';
import { auth } from './auth.js';
import { dbOps } from './db.js';
import { utils } from './utils.js';

export const router = {
    // التحقق من المسار الحالي وتشغيله
    handleRoute: async () => {
        const path = window.location.pathname;
        ui.showLoader();

        // تحديث الهيدر بناءً على حالة الجلسة
        const isAuthenticated = auth.isAuthenticated();
        const user = auth.getCurrentUser();
        ui.updateNav(user);

        // منطق التوجيه (SPA Router)
        if (path === '/' || path === '/index.html') {
            ui.renderHome(isAuthenticated);
        } 
        else if (path === '/register') {
            if (isAuthenticated) { router.navigate('/share'); return; }
            ui.renderRegister();
        } 
        else if (path === '/login') {
            if (isAuthenticated) { router.navigate('/share'); return; }
            ui.renderLogin();
        } 
        // حماية المسارات (Requires Auth)
        else if (path === '/create') {
            if (!isAuthenticated) { router.navigate('/login'); return; }
            const userData = await dbOps.getUserPublicData(user.uid);
            ui.renderCreate(userData?.questions || []);
        } 
        else if (path === '/share') {
            if (!isAuthenticated) { router.navigate('/login'); return; }
            ui.renderShare(user.uid);
        } 
        else if (path === '/results') {
            if (!isAuthenticated) { router.navigate('/login'); return; }
            const userData = await dbOps.getUserPublicData(user.uid);
            const responses = await dbOps.getUserResponses(user.uid);
            const analysis = utils.analyzeResults(userData?.questions || [], responses);
            ui.renderResults(analysis);
        }
        // مسار المشاركين المتغير (Dynamic Route): /r/{userId}
        else if (path.startsWith('/r/')) {
            const targetUserId = path.substring(3); // استخراج ID من الرابط
            if (!targetUserId || targetUserId.trim() === '') { ui.render404(); ui.hideLoader(); return; }
            
            const ownerData = await dbOps.getUserPublicData(targetUserId);
            if (!ownerData) {
                document.getElementById('app-content').innerHTML = `<div class="alert alert-danger text-center">عذراً، هذا الرابط غير صحيح أو تم حذف الحساب.</div>`;
            } else {
                ui.renderSurvey(ownerData.displayName, ownerData.questions);
            }
        }
        else {
            ui.render404();
        }

        ui.hideLoader();
    },

    // التوجه لمسار جديد برمجياً
    navigate: (path) => {
        window.history.pushState({}, "", path);
        router.handleRoute();
    }
};

// الاستماع لزر الرجوع في المتصفح
window.addEventListener('popstate', router.handleRoute);
