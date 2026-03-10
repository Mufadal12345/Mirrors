// filename: js/firebase-config.js
// تهيئة Firebase Client SDK (Vanilla JS Modules)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// --- بيانات تكوين Firebase الخاصة بمشروعك (liev-69588) ---
const firebaseConfig = {
  apiKey: "AIzaSyBhdK4tSzTUU_n1UV7b8hPJF1ZK9cmNR4s",
  authDomain: "liev-69588.firebaseapp.com",
  databaseURL: "https://liev-69588-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "liev-69588",
  storageBucket: "liev-69588.firebasestorage.app",
  messagingSenderId: "619867900437",
  appId: "1:619867900437:web:2ab4f6ad25b38b166c9c1c",
  measurementId: "G-K4JG8RRF0W"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// الحصول على مرجع لخدمة Firestore (قاعدة البيانات)
const db = getFirestore(app);

// تهيئة التحليلات (لا تعمل إلا على بروتوكول HTTPS)
const analytics = (typeof window !== 'undefined' && window.location.protocol === 'https:') ? getAnalytics(app) : null;

// تصدير المتغيرات لاستخدامها في ملفات أخرى في تطبيقك (مثل db.js)
export { db, app, analytics };
