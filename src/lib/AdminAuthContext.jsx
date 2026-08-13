import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const AdminAuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const normalize = (email) => (email || '').trim().toLowerCase();

// Chủ sở hữu cố định. Luôn toàn quyền và không phụ thuộc Firestore, để còn
// đăng nhập được khi collection 'admins' rỗng hoặc mạng lỗi.
const OWNER_EMAIL = normalize(import.meta.env.VITE_ADMIN_EMAIL);

/**
 * Vai trò của một email: 'owner' (xem + xoá), 'viewer' (chỉ xem), hoặc null.
 * Admin phụ được khai trong collection 'admins', doc id là email viết thường,
 * field 'role' nhận 'owner' hoặc 'viewer'. Thêm admin chỉ cần tạo document,
 * không phải sửa biến env hay deploy lại.
 */
async function resolveRole(email) {
  const e = normalize(email);
  if (!e) return null;
  if (e === OWNER_EMAIL) return 'owner';

  try {
    const snap = await getDoc(doc(db, 'admins', e));
    if (!snap.exists()) return null;
    const role = snap.data().role;
    return role === 'owner' || role === 'viewer' ? role : null;
  } catch (err) {
    // Không đọc được thì coi như không có quyền, không mở cửa khi lỗi
    console.error('Không đọc được quyền admin:', err);
    return null;
  }
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        if (!cancelled) {
          setUser(null);
          setRole(null);
          setLoading(false);
        }
        return;
      }

      const nextRole = await resolveRole(firebaseUser.email);
      if (cancelled) return;

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
      setLoading(false);
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
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
