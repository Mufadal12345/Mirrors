// filename: js/auth.js
import { db } from './firebase-config.js';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ui } from './utils.js';
import { router } from './router.js';

const STORAGE_KEY = 'monzori_user_session';

export const auth = {
    // التحقق مما إذا كان المستخدم مسجلاً
    isAuthenticated: () => {
        return localStorage.getItem(STORAGE_KEY) !== null;
    },

    // الحصول على بيانات المستخدم الحالي
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    },

    // تسجيل حساب جديد
    register: async (username, password, displayName) => {
        ui.showLoader();
        try {
            // 1. التحقق من أن اسم المستخدم غير مأخوذ (case-insensitive)
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username.toLowerCase()));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                ui.showToast('خطأ', 'اسم المستخدم هذا مأخوذ بالفعل، اختر اسماً آخر.', 'danger');
                ui.hideLoader();
                return false;
            }

            // 2. إنشاء المستند في Firestore
            // تنبيه أمني: تخزين كلمة المرور كنص عادي خطر جداً!
            const newUser = {
                username: username.toLowerCase(),
                password: password, 
                displayName: displayName,
                createdAt: serverTimestamp(),
                questions: [] // مصفوفة فارغة
            };

            const docRef = await addDoc(usersRef, newUser);
            
            // 3. تخزين الجلسة
            const sessionData = { uid: docRef.id, username: newUser.username, displayName: newUser.displayName };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));

            ui.showToast('نجاح', `أهلاً بك ${displayName}! تم إنشاء حسابك بنجاح.`, 'success');
            ui.hideLoader();
            router.navigate('/create'); // التوجه لإنشاء الرابط
            return true;

        } catch (error) {
            console.error("Error registering user:", error);
            ui.showToast('خطأ', 'حدث خطأ أثناء التسجيل. حاول مرة أخرى.', 'danger');
            ui.hideLoader();
            return false;
        }
    },

    // تسجيل الدخول
    login: async (username, password) => {
        ui.showLoader();
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username.toLowerCase()), where("password", "==", password));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                ui.showToast('خطأ', 'اسم المستخدم أو كلمة المرور غير صحيحة.', 'danger');
                ui.hideLoader();
                return false;
            }

            // الحصول على بيانات المستخدم
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            // تخزين الجلسة
            const sessionData = { uid: userDoc.id, username: userData.username, displayName: userData.displayName };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));

            ui.showToast('نجاح', `مرحباً بعودتك ${userData.displayName}!`, 'success');
            ui.hideLoader();
            
            // التوجه للوحة التحكم أو النتائج
            if (userData.questions && userData.questions.length > 0) {
                router.navigate('/share');
            } else {
                router.navigate('/create');
            }
            return true;

        } catch (error) {
            console.error("Error logging in:", error);
            ui.showToast('خطأ', 'حدث خطأ أثناء تسجيل الدخول.', 'danger');
            ui.hideLoader();
            return false;
        }
    },

    // تسجيل الخروج
    logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        ui.showToast('تنبيه', 'تم تسجيل الخروج بنجاح.');
        ui.updateNav(null);
        router.navigate('/');
    }
};
