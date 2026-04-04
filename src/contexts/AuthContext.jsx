import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, db } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext(null);
export function useAuth() { return useContext(AuthContext); }

function migrateOldProfile(data) {
  if (data.interface_stage !== undefined) return data;
  const old = data.level;
  if (!old) return data;
  const map = {
    beginner:     { placement_level: "aware_beginner", interface_stage: 1, mock_trade_count: 0, virtual_portfolio_value: 100000 },
    intermediate: { placement_level: "intermediate",   interface_stage: 2, mock_trade_count: 5, virtual_portfolio_value: 500000 },
    advanced:     { placement_level: "experienced",    interface_stage: 3, mock_trade_count: 20, virtual_portfolio_value: 1000000 },
  };
  return { ...data, ...(map[old] || map.beginner) };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const migrated = migrateOldProfile(snap.data());
            if (migrated.interface_stage !== undefined && snap.data().interface_stage === undefined) {
              await updateDoc(ref, { placement_level: migrated.placement_level, interface_stage: migrated.interface_stage, mock_trade_count: migrated.mock_trade_count || 0, virtual_portfolio_value: migrated.virtual_portfolio_value || 100000 }).catch(() => {});
            }
            setUserProfile(migrated);
          } else {
            const profile = { uid: u.uid, email: u.email, displayName: u.displayName || "", photoURL: u.photoURL || "", createdAt: serverTimestamp() };
            await setDoc(ref, profile);
            setUserProfile(profile);
          }
        } catch (e) { console.error(e); }
      } else { setUserProfile(null); }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function completeOnboarding({ placement_level, interface_stage, starting_module, mock_portfolio_value }) {
    if (!user) return;
    const data = { placement_level, interface_stage, starting_module: starting_module || 1, mock_trade_count: 0, streak_current: 0, streak_longest: 0, virtual_portfolio_value: mock_portfolio_value || 100000, vocab_introduced: [], onboardedAt: serverTimestamp() };
    try { await updateDoc(doc(db, "users", user.uid), data); setUserProfile(prev => ({ ...prev, ...data })); } catch (e) { console.error(e); }
  }

  async function updateUserProfile(fields) {
    if (!user) return;
    try { await updateDoc(doc(db, "users", user.uid), fields); setUserProfile(prev => ({ ...prev, ...fields })); } catch (e) { console.error(e); }
  }

  async function loginWithGoogle() { return (await signInWithPopup(auth, googleProvider)).user; }
  async function loginWithEmail(email, pw) { return (await signInWithEmailAndPassword(auth, email, pw)).user; }
  async function signupWithEmail(email, pw, name) { const r = await createUserWithEmailAndPassword(auth, email, pw); await updateProfile(r.user, { displayName: name }); return r.user; }
  async function logout() { await signOut(auth); setUser(null); setUserProfile(null); }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, loginWithGoogle, loginWithEmail, signupWithEmail, logout, completeOnboarding, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
