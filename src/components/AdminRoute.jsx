import React from 'react';
import { useAdminAuth } from '../lib/AdminAuthContext';
import { motion } from 'framer-motion';

function AdminRoute({ children }) {
  const { user, loading, error, login, isAdmin } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-be-vietnam">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 max-w-md w-full text-center border border-white/10"
        >
          <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="font-be-vietnam font-black text-2xl text-white mb-2">Trang Quản Trị</h1>
          <p className="text-slate-400 font-be-vietnam mb-8 text-sm">
            Đăng nhập bằng tài khoản Google được cấp quyền Admin để truy cập Dashboard.
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm font-be-vietnam">{error}</p>
            </div>
          )}

          <button
            onClick={login}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-be-vietnam font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Đăng nhập bằng Google
          </button>

          <a href="/" className="inline-block mt-6 text-slate-500 hover:text-slate-300 text-sm font-be-vietnam transition-colors">
            ← Quay về trang chủ
          </a>
        </motion.div>
      </div>
    );
  }

  return children;
}

export default AdminRoute;
