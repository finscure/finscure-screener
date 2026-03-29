import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, db } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext(null);
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            await setDoc(ref, { uid: u.uid, email: u.email, displayName: u.displayName || "", photoURL: u.photoURL || "", createdAt: serverTimestamp() });
          }
        } catch (e) { console.error(e); }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function loginWithGoogle() { return (await signInWithPopup(auth, googleProvider)).user; }
  async function loginWithEmail(email, pw) { return (await signInWithEmailAndPassword(auth, email, pw)).user; }
  async function signupWithEmail(email, pw, name) { const r = await createUserWithEmailAndPassword(auth, email, pw); await updateProfile(r.user, { displayName: name }); return r.user; }
  async function logout() { await signOut(auth); setUser(null); }

  return <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmail, signupWithEmail, logout }}>{children}</AuthContext.Provider>;
}
