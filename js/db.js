// filename: js/db.js
import { db } from './firebase-config.js';
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ui } from './utils.js'; //ui محقون في utils

export const dbOps = {
    // الحصول على بيانات مستخدم محدد (لجلب الأسئلة أو الاسم)
    getUserPublicData: async (userId) => {
        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error getting user data:", error);
            return null;
        }
    },

    // حفظ الأسئلة المخصصة للمستخدم الرئيسي
    saveUserQuestions: async (userId, questionsArray) => {
        ui.showLoader();
        try {
            const docRef = doc(db, "users", userId);
            await updateDoc(docRef, {
                questions: questionsArray
            });
            ui.showToast('نجاح', 'تم حفظ أسئلتك المخصصة بنجاح.', 'success');
            ui.hideLoader();
            return true;
        } catch (error) {
            console.error("Error saving questions:", error);
            ui.showToast('خطأ', 'حدث خطأ أثناء حفظ الأسئلة.', 'danger');
            ui.hideLoader();
            return false;
        }
    },

    // إرسال إجابات المشارك
    submitResponse: async (targetUserId, answersObj, anonymousMessage) => {
        ui.showLoader();
        try {
            const responsesRef = collection(db, "responses");
            await addDoc(responsesRef, {
                userId: targetUserId, // المرجع للمستخدم الأصلي
                answers: answersObj, // كائن { qId: value }
                anonymousMessage: anonymousMessage,
                timestamp: serverTimestamp()
            });
            ui.showToast('شكراً لك!', 'تم إرسال تقييمك بنجاح وبسرية تامة.', 'success');
            ui.hideLoader();
            return true;
        } catch (error) {
            console.error("Error submitting response:", error);
            ui.showToast('خطأ', 'حدث خطأ أثناء إرسال الإجابات.', 'danger');
            ui.hideLoader();
            return false;
        }
    },

    // الحصول على جميع الإجابات الخاصة بمستخدم معين (للنتائج)
    getUserResponses: async (userId) => {
        try {
            const responsesRef = collection(db, "responses");
            const q = query(responsesRef, where("userId", "==", userId), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            
            const responses = [];
            querySnapshot.forEach((doc) => {
                responses.push(doc.data());
            });
            return responses;
        } catch (error) {
            // ملاحظة: قد يفشل orderBy إذا لم يتم إنشاء Index في Firebase Console
            console.warn("Error getting responses with orderBy, trying without:", error);
            try {
                const responsesRef = collection(db, "responses");
                const qBasic = query(responsesRef, where("userId", "==", userId));
                const querySnapshotBasic = await getDocs(qBasic);
                const responsesBasic = [];
                querySnapshotBasic.forEach((doc) => {
                    responsesBasic.push(doc.data());
                });
                return responsesBasic;
            } catch (innerError) {
                console.error("Error getting responses:", innerError);
                return [];
            }
        }
    }
};
