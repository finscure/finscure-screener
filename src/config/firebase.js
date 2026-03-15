import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ═══════════════════════════════════════════════════
// PASTE YOUR FIREBASE CONFIG BELOW
// Get this from: Firebase Console > Project Settings > Your Apps > Config
// ═══════════════════════════════════════════════════
const firebaseConfig = {
  apiKey: "AIzaSyCnLNoKgkXsME2U9gHVt4pFUZtv3xbMUTA",
  authDomain: "finscure-screener.firebaseapp.com",
  projectId: "finscure-screener",
  storageBucket: "finscure-screener.firebasestorage.app",
  messagingSenderId: "306981915645",
  appId: "1:306981915645:web:1657a493dde06f5f6d6794"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;


