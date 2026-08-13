import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

const AdminAuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const normalize = (email) => (email || '').trim().toLowerCase();

// Toàn quyền: xem, xuất Excel, xoá
const OWNER_EMAIL = normalize(import.meta.env.VITE_ADMIN_EMAIL);
// Chỉ xem và xuất Excel, không xoá. Nhiều email cách nhau bởi dấu phẩy.
const VIEWER_EMAILS = (import.meta.env.VITE_ADMIN_VIEWER_EMAILS || '')
  .split(',')
  .map(normalize)
  .filter(Boolean);

function getRole(email) {
  const e = normalize(email);
  if (!e) return null;
  if (e === OWNER_EMAIL) return 'owner';
  if (VIEWER_EMAILS.includes(e)) return 'viewer';
  return null;
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const nextRole = getRole(firebaseUser.email);
        if (nextRole) {
          setUser(firebaseUser);
          setRole(nextRole);
          setError(null);
        } else {
          setError(`Email ${firebaseUser.email} không có quyền truy cập.`);
          signOut(auth);
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
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
    setRole(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, role, canDelete: role === 'owner', loading, error, login, logout, isAdmin: !!user }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
}
