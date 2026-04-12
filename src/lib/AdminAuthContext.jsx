import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

const AdminAuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.email === ADMIN_EMAIL) {
          setUser(firebaseUser);
          setError(null);
        } else {
          setError(`Email ${firebaseUser.email} không có quyền truy cập.`);
          signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError('Đăng nhập thất bại: ' + err.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, error, login, logout, isAdmin: !!user }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
}
