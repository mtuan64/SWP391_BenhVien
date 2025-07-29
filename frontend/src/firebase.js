// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// ⚠️ Thay thế cấu hình này bằng cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBkjqFC8GmTxAKM_QbjNKJFk_QUpg-MdyI",
  authDomain: "menmen-74fa8.firebaseapp.com",
  projectId: "menmen-74fa8",
  storageBucket: "menmen-74fa8.appspot.com", // ✅ ĐÃ SỬA
  messagingSenderId: "1060143283934",
  appId: "1:1060143283934:web:3a02bddc1c213300744c4f",
  measurementId: "G-G9M2D4K4B8"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Lấy đối tượng xác thực và provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };

