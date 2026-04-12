import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../../lib/AdminAuthContext';
import { fetchAllUsers, fetchAllTestResults, deleteUser, deleteTestResult, exportToCSV } from '../../lib/firestore-admin';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const TABS = [
  { id: 'overview', label: 'Tổng quan', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
  { id: 'users', label: 'Người dùng', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { id: 'results', label: 'Kết quả Test', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { id: 'analytics', label: 'Phân tích', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'export', label: 'Xuất dữ liệu', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
];

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

function formatDate(ts) {
  if (!ts) return '—';
  const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function StatCard({ label, value, icon, color }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </span>
      </div>
      <div className="font-be-vietnam font-black text-3xl text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm font-be-vietnam">{label}</div>
    </motion.div>
  );
}

function AdminDashboard() {
  const { user, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvince, setFilterProvince] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [expandedResult, setExpandedResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [u, r] = await Promise.all([fetchAllUsers(), fetchAllTestResults()]);
      setUsers(u);
      setResults(r);
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  }

  // ---- Computed data ----
  const provinces = useMemo(() => [...new Set(users.map(u => u.province).filter(Boolean))].sort(), [users]);
  const roles = useMemo(() => [...new Set(users.map(u => u.role).filter(Boolean))].sort(), [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchSearch = !searchTerm || (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (u.phone || '').includes(searchTerm);
      const matchProvince = !filterProvince || u.province === filterProvince;
      const matchRole = !filterRole || u.role === filterRole;
      return matchSearch && matchProvince && matchRole;
    });
  }, [users, searchTerm, filterProvince, filterRole]);

  // Chart: Registrations per day (last 30 days)
  const dailyRegistrations = useMemo(() => {
    const map = {};
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i);
      map[d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })] = 0;
    }
    users.forEach(u => {
      if (u.createdAt?.seconds) {
        const d = new Date(u.createdAt.seconds * 1000);
        const key = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
        if (map[key] !== undefined) map[key]++;
      }
    });
    return Object.entries(map).map(([date, count]) => ({ date, count }));
  }, [users]);

  // Chart: Province distribution (top 10)
  const provinceData = useMemo(() => {
    const map = {};
    users.forEach(u => { if (u.province) map[u.province] = (map[u.province] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10)
      .map(([name, value]) => ({ name: name.replace('Thành phố ', 'TP ').replace('Tỉnh ', ''), value }));
  }, [users]);

  // Chart: Role distribution
  const roleData = useMemo(() => {
    const map = {};
    users.forEach(u => { if (u.role) map[u.role] = (map[u.role] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [users]);

  // Chart: Holland RIASEC average
  const hollandAvg = useMemo(() => {
    const dims = ['R', 'I', 'A', 'S', 'E', 'C'];
    const labels = { R: 'Thực tế', I: 'Nghiên cứu', A: 'Nghệ thuật', S: 'Xã hội', E: 'Doanh nhân', C: 'Quy củ' };
    const sums = {}; let count = 0;
    dims.forEach(d => sums[d] = 0);
    results.forEach(r => {
      if (r.holland?.percentages) {
        count++;
        dims.forEach(d => { sums[d] += (r.holland.percentages[d] || 0); });
      }
    });
    if (!count) return [];
    return dims.map(d => ({ subject: labels[d], value: Math.round(sums[d] / count), fullMark: 100 }));
  }, [results]);

  // Chart: MBTI distribution
  const mbtiData = useMemo(() => {
    const map = {};
    results.forEach(r => { if (r.mbti?.type) map[r.mbti.type] = (map[r.mbti.type] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10)
      .map(([name, value]) => ({ name, value }));
  }, [results]);

  // Chart: DISC distribution
  const discData = useMemo(() => {
    const map = { D: 0, I: 0, S: 0, C: 0 };
    const labels = { D: 'Thống trị', I: 'Ảnh hưởng', S: 'Ổn định', C: 'Cẩn thận' };
    results.forEach(r => { if (r.disc?.dominant) map[r.disc.dominant]++; });
    return Object.entries(map).map(([key, value]) => ({ name: labels[key] || key, value }));
  }, [results]);

  // Chart: Tests per day
  const dailyTests = useMemo(() => {
    const map = {};
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i);
      map[d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })] = 0;
    }
    results.forEach(r => {
      if (r.createdAt?.seconds) {
        const d = new Date(r.createdAt.seconds * 1000);
        const key = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
        if (map[key] !== undefined) map[key]++;
      }
    });
    return Object.entries(map).map(([date, count]) => ({ date, count }));
  }, [results]);

  // Chart: Popular careers
  const careerData = useMemo(() => {
    const map = {};
    users.forEach(u => {
      if (u.careers && Array.isArray(u.careers)) {
        u.careers.forEach(c => { if (c) map[c] = (map[c] || 0) + 1; });
      }
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10)
      .map(([name, value]) => ({ name, value }));
  }, [users]);

  // Most popular test
  const topTest = useMemo(() => {
    const map = { holland: 0, mbti: 0, disc: 0 };
    results.forEach(r => { (r.testsCompleted || []).forEach(t => map[t]++); });
    const top = Object.entries(map).sort((a, b) => b[1] - a[1])[0];
    return top ? top[0].toUpperCase() : '—';
  }, [results]);

  // Top province
  const topProvince = useMemo(() => {
    if (!provinceData.length) return '—';
    return provinceData[0].name;
  }, [provinceData]);

  async function handleDeleteUser(id) {
    if (!confirm('Bạn có chắc muốn xóa người dùng này?')) return;
    await deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  }

  async function handleDeleteResult(id) {
    if (!confirm('Bạn có chắc muốn xóa kết quả test này?')) return;
    await deleteTestResult(id);
    setResults(prev => prev.filter(r => r.id !== id));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-be-vietnam">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0a0f1e] border-r border-white/5 flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {sidebarOpen && <span className="font-be-vietnam font-black text-white text-lg">Admin</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-be-vietnam text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500/20 text-amber-500'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {sidebarOpen && tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          {sidebarOpen && (
            <div className="flex items-center gap-3 mb-4 px-2">
              <img src={user?.photoURL} alt="" className="w-8 h-8 rounded-full" />
              <div className="min-w-0">
                <p className="text-white text-xs font-bold truncate">{user?.displayName}</p>
                <p className="text-slate-500 text-[10px] truncate">{user?.email}</p>
              </div>
            </div>
          )}
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 font-be-vietnam text-sm transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && 'Đăng xuất'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="font-be-vietnam font-black text-white text-xl">
              {TABS.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <button onClick={loadData} className="flex items-center gap-2 text-slate-400 hover:text-amber-500 font-be-vietnam text-sm px-4 py-2 rounded-xl hover:bg-white/5 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Làm mới
          </button>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* ===== TAB: OVERVIEW ===== */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard label="Tổng người dùng" value={users.length} icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" color="bg-blue-500/20 text-blue-400" />
                  <StatCard label="Tổng lượt test" value={results.length} icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" color="bg-amber-500/20 text-amber-400" />
                  <StatCard label="Tỉnh đông nhất" value={topProvince} icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" color="bg-emerald-500/20 text-emerald-400" />
                  <StatCard label="Test phổ biến nhất" value={topTest} icon="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" color="bg-purple-500/20 text-purple-400" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Line: Daily registrations */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Đăng ký theo ngày (30 ngày)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={dailyRegistrations}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} interval="preserveStartEnd" />
                        <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: 'Be Vietnam Pro' }} />
                        <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} dot={false} name="Lượt đăng ký" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar: Province distribution */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Top 10 Tỉnh/Thành phố</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={provinceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis type="number" stroke="#64748b" fontSize={12} allowDecimals={false} />
                        <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={100} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: 'Be Vietnam Pro' }} />
                        <Bar dataKey="value" fill="#6366f1" radius={[0, 8, 8, 0]} name="Số người" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie: Role distribution */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Phân bố vai trò</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={roleData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                          {roleData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: 'Be Vietnam Pro' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===== TAB: USERS ===== */}
            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex flex-wrap gap-4 mb-6">
                  <input type="text" placeholder="Tìm tên hoặc SĐT..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-be-vietnam text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 w-64" />
                  <select value={filterProvince} onChange={e => setFilterProvince(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-be-vietnam text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30">
                    <option value="">Tất cả tỉnh</option>
                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-be-vietnam text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30">
                    <option value="">Tất cả vai trò</option>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <span className="text-slate-500 font-be-vietnam text-sm self-center ml-auto">Hiển thị {filteredUsers.length}/{users.length}</span>
                </div>

                <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/10">
                          {['Họ tên', 'SĐT', 'Tỉnh/TP', 'Vai trò', 'Trường', 'Ngày ĐK', ''].map(h => (
                            <th key={h} className="px-5 py-4 text-slate-400 font-be-vietnam text-xs uppercase tracking-wider font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.slice(0, 50).map(u => (
                          <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-5 py-3.5 text-white font-be-vietnam text-sm font-medium">{u.name || '—'}</td>
                            <td className="px-5 py-3.5 text-slate-300 font-be-vietnam text-sm">{u.phone || '—'}</td>
                            <td className="px-5 py-3.5 text-slate-300 font-be-vietnam text-sm">{(u.province || '').replace('Thành phố ', 'TP ').replace('Tỉnh ', '')}</td>
                            <td className="px-5 py-3.5"><span className="bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-lg text-xs font-bold font-be-vietnam">{u.role || '—'}</span></td>
                            <td className="px-5 py-3.5 text-slate-300 font-be-vietnam text-sm">{u.school || '—'}</td>
                            <td className="px-5 py-3.5 text-slate-500 font-be-vietnam text-xs">{formatDate(u.createdAt)}</td>
                            <td className="px-5 py-3.5">
                              <button onClick={() => handleDeleteUser(u.id)} className="text-red-400/60 hover:text-red-400 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredUsers.length > 50 && (
                    <div className="px-5 py-3 text-center text-slate-500 text-xs font-be-vietnam border-t border-white/5">
                      Hiển thị 50/{filteredUsers.length} kết quả. Sử dụng bộ lọc để thu hẹp.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ===== TAB: RESULTS ===== */}
            {activeTab === 'results' && (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/10">
                          {['#', 'Tests', 'Holland', 'MBTI', 'DISC', 'Ngày làm', ''].map(h => (
                            <th key={h} className="px-5 py-4 text-slate-400 font-be-vietnam text-xs uppercase tracking-wider font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.slice(0, 50).map((r, idx) => (
                          <React.Fragment key={r.id}>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setExpandedResult(expandedResult === r.id ? null : r.id)}>
                              <td className="px-5 py-3.5 text-slate-500 font-be-vietnam text-xs">#{idx + 1}</td>
                              <td className="px-5 py-3.5">
                                <div className="flex gap-1.5">
                                  {(r.testsCompleted || []).map(t => (
                                    <span key={t} className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-lg text-[10px] font-black font-be-vietnam uppercase">{t}</span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-5 py-3.5 text-white font-be-vietnam text-sm font-bold">{r.holland?.code || '—'}</td>
                              <td className="px-5 py-3.5 text-white font-be-vietnam text-sm font-bold">{r.mbti?.type || '—'}</td>
                              <td className="px-5 py-3.5 text-white font-be-vietnam text-sm font-bold">{r.disc?.dominant || '—'}</td>
                              <td className="px-5 py-3.5 text-slate-500 font-be-vietnam text-xs">{formatDate(r.createdAt)}</td>
                              <td className="px-5 py-3.5 flex gap-2">
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteResult(r.id); }} className="text-red-400/60 hover:text-red-400 transition-colors">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </td>
                            </tr>
                            {expandedResult === r.id && (
                              <tr>
                                <td colSpan={7} className="px-5 py-4 bg-white/[0.02]">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-be-vietnam">
                                    {r.holland?.percentages && (
                                      <div className="bg-white/5 rounded-xl p-4">
                                        <h4 className="text-amber-500 font-bold mb-2">Holland Scores</h4>
                                        {Object.entries(r.holland.percentages).map(([k, v]) => (
                                          <div key={k} className="flex justify-between text-slate-300 mb-1">
                                            <span>{k}</span><span className="font-bold">{v}%</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {r.mbti?.percentages && (
                                      <div className="bg-white/5 rounded-xl p-4">
                                        <h4 className="text-purple-400 font-bold mb-2">MBTI Scores</h4>
                                        {Object.entries(r.mbti.percentages).map(([k, v]) => (
                                          <div key={k} className="flex justify-between text-slate-300 mb-1">
                                            <span>{k}</span><span className="font-bold">{v}%</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {r.disc?.percentages && (
                                      <div className="bg-white/5 rounded-xl p-4">
                                        <h4 className="text-emerald-400 font-bold mb-2">DISC Scores</h4>
                                        {Object.entries(r.disc.percentages).map(([k, v]) => (
                                          <div key={k} className="flex justify-between text-slate-300 mb-1">
                                            <span>{k}</span><span className="font-bold">{v}%</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  {r.aiAnalysis && (
                                    <div className="mt-4 bg-white/5 rounded-xl p-4">
                                      <h4 className="text-amber-500 font-bold font-be-vietnam text-xs mb-2">AI Analysis</h4>
                                      <p className="text-slate-300 text-xs font-be-vietnam whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">{r.aiAnalysis}</p>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===== TAB: ANALYTICS ===== */}
            {activeTab === 'analytics' && (
              <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Radar: Holland average */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Holland RIASEC trung bình</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={hollandAvg}>
                        <PolarGrid stroke="#1e293b" />
                        <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                        <PolarRadiusAxis stroke="#334155" fontSize={10} />
                        <Radar name="Trung bình %" dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={2} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: 'Be Vietnam Pro' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar: MBTI distribution */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Top MBTI phổ biến</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mbtiData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: 'Be Vietnam Pro' }} />
                        <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Số lượt" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie: DISC */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Phân bố DISC</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={discData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                          {discData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: 'Be Vietnam Pro' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Area: Tests over time */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Xu hướng test theo ngày</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={dailyTests}>
                        <defs>
                          <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} interval="preserveStartEnd" />
                        <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: 'Be Vietnam Pro' }} />
                        <Area type="monotone" dataKey="count" stroke="#10b981" fill="url(#colorTests)" strokeWidth={2} name="Lượt test" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar: Popular careers */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 lg:col-span-2">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Ngành nghề được quan tâm nhiều nhất</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={careerData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis type="number" stroke="#64748b" fontSize={12} allowDecimals={false} />
                        <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={180} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: 'Be Vietnam Pro' }} />
                        <Bar dataKey="value" fill="#ec4899" radius={[0, 8, 8, 0]} name="Số lượt quan tâm" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===== TAB: EXPORT ===== */}
            {activeTab === 'export' && (
              <motion.div key="export" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-be-vietnam font-black text-white text-lg mb-2">Danh sách Users</h3>
                    <p className="text-slate-400 font-be-vietnam text-sm mb-6">{users.length} bản ghi</p>
                    <button
                      onClick={() => exportToCSV(users.map(u => ({
                        'Họ tên': u.name, 'SĐT': u.phone, 'Tỉnh/TP': u.province,
                        'Vai trò': u.role, 'Trường': u.school, 'Năm sinh': u.birthYear,
                        'Ngành quan tâm': (u.careers || []).join('; '),
                        'Ngày ĐK': formatDate(u.createdAt)
                      })), 'users')}
                      className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-be-vietnam font-bold rounded-xl transition-all active:scale-95"
                    >
                      Tải xuống CSV
                    </button>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center">
                    <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="font-be-vietnam font-black text-white text-lg mb-2">Kết quả Test</h3>
                    <p className="text-slate-400 font-be-vietnam text-sm mb-6">{results.length} bản ghi</p>
                    <button
                      onClick={() => exportToCSV(results.map(r => ({
                        'Tests': (r.testsCompleted || []).join(', '),
                        'Holland Code': r.holland?.code || '',
                        'MBTI Type': r.mbti?.type || '',
                        'DISC Dominant': r.disc?.dominant || '',
                        'Holland Scores': r.holland?.percentages ? JSON.stringify(r.holland.percentages) : '',
                        'MBTI Scores': r.mbti?.percentages ? JSON.stringify(r.mbti.percentages) : '',
                        'DISC Scores': r.disc?.percentages ? JSON.stringify(r.disc.percentages) : '',
                        'Ngày làm': formatDate(r.createdAt)
                      })), 'test_results')}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-be-vietnam font-bold rounded-xl transition-all active:scale-95"
                    >
                      Tải xuống CSV
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
