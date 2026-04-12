import React, { useState, useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../../lib/AdminAuthContext';
import { fetchAllUsers, fetchAllTestResults, deleteUser, deleteTestResult, exportToExcel } from '../../lib/firestore-admin';
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

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
const TOOLTIP_STYLE = { background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontFamily: 'Be Vietnam Pro', fontSize: '13px' };

function formatDate(ts) {
  if (!ts) return '—';
  const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Normalize career names: remove diacritics, trim, lowercase, then capitalize
function normalizeCareer(name) {
  if (!name) return '';
  return name.trim().replace(/\s+/g, ' ');
}

function removeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function groupCareerNames(careerMap) {
  const normalized = {};
  const displayNames = {};

  Object.entries(careerMap).forEach(([name, count]) => {
    const key = removeDiacritics(name);
    if (!normalized[key]) {
      normalized[key] = 0;
      displayNames[key] = name;
    }
    normalized[key] += count;
    // Keep the version with most occurrences as display name
    if (count > (careerMap[displayNames[key]] || 0) || name.length > displayNames[key].length) {
      displayNames[key] = name;
    }
  });

  return Object.entries(normalized).map(([key, value]) => ({
    name: displayNames[key],
    value
  }));
}

// Markdown renderer for admin (dark theme version)
function renderMarkdownDark(text) {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '';
  let inSection = false;

  const getSectionTheme = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('điểm mạnh')) return { border: 'border-blue-500/50', bg: 'bg-blue-500/10', text: 'text-blue-300', icon: '💪' };
    if (lower.includes('nghề') && lower.includes('hợp')) return { border: 'border-emerald-500/50', bg: 'bg-emerald-500/10', text: 'text-emerald-300', icon: '🎯' };
    if (lower.includes('lộ trình')) return { border: 'border-amber-500/50', bg: 'bg-amber-500/10', text: 'text-amber-300', icon: '🗺️' };
    if (lower.includes('kỹ năng')) return { border: 'border-purple-500/50', bg: 'bg-purple-500/10', text: 'text-purple-300', icon: '🛠️' };
    if (lower.includes('rủi ro') || lower.includes('cảnh báo')) return { border: 'border-red-500/50', bg: 'bg-red-500/10', text: 'text-red-300', icon: '⚠️' };
    if (lower.includes('câu hỏi') || lower.includes('tự vấn')) return { border: 'border-teal-500/50', bg: 'bg-teal-500/10', text: 'text-teal-300', icon: '💡' };
    if (lower.includes('đánh giá') || lower.includes('ngành nghề đã chọn')) return { border: 'border-orange-500/50', bg: 'bg-orange-500/10', text: 'text-orange-300', icon: '🔍' };
    return { border: 'border-slate-500/50', bg: 'bg-slate-500/10', text: 'text-slate-300', icon: '📌' };
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (/^---+$/.test(trimmed)) {
      if (inSection) { html += '</div>'; inSection = false; }
      html += '<hr class="my-4 border-t border-white/10"/>';
      return;
    }
    const h2Match = trimmed.match(/^##\s+(.+)$/);
    if (h2Match) {
      if (inSection) { html += '</div>'; }
      const theme = getSectionTheme(h2Match[1]);
      html += `<div class="rounded-xl ${theme.bg} border-l-4 ${theme.border} p-4 my-3">`;
      html += `<h2 class="font-be-vietnam font-bold text-sm ${theme.text} mb-2 flex items-center gap-2">`;
      html += `<span>${theme.icon}</span> ${h2Match[1]}</h2>`;
      inSection = true;
      return;
    }
    const h3Match = trimmed.match(/^###\s+(.+)$/);
    if (h3Match) {
      html += `<h3 class="font-be-vietnam font-semibold text-xs text-slate-200 mt-2 mb-1">${h3Match[1]}</h3>`;
      return;
    }
    const h1Match = trimmed.match(/^#\s+(.+)$/);
    if (h1Match) {
      if (inSection) { html += '</div>'; inSection = false; }
      html += `<h1 class="font-be-vietnam font-bold text-base text-white mt-4 mb-2">${h1Match[1]}</h1>`;
      return;
    }
    const listMatch = trimmed.match(/^[-•]\s+(.+)$/);
    if (listMatch) {
      let content = listMatch[1]
        .replace(/\*\*(.*?)\*\*/g, '<span class="text-amber-400 font-semibold">$1</span>')
        .replace(/`(.*?)`/g, '<code class="bg-white/10 text-slate-200 px-1 py-0.5 rounded text-[10px]">$1</code>');
      html += `<div class="flex items-start gap-2 mb-1.5 ml-1">`;
      html += `<span class="text-emerald-400 mt-0.5 text-xs">●</span>`;
      html += `<span class="text-slate-300 text-xs leading-relaxed">${content}</span></div>`;
      return;
    }
    if (trimmed === '') { html += '<div class="h-1.5"></div>'; return; }
    let content = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<span class="text-amber-400 font-semibold">$1</span>')
      .replace(/`(.*?)`/g, '<code class="bg-white/10 text-slate-200 px-1 py-0.5 rounded text-[10px]">$1</code>');
    html += `<p class="text-slate-300 text-xs leading-relaxed mb-1.5">${content}</p>`;
  });
  if (inSection) { html += '</div>'; }
  return DOMPurify.sanitize(html);
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

  useEffect(() => { loadData(); }, []);

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

  // Map userId → userName for results
  const userMap = useMemo(() => {
    const map = {};
    users.forEach(u => { map[u.id] = u; });
    return map;
  }, [users]);

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

  // Chart: Tests per day (moved to overview - Issue 7)
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

  // Chart: Popular careers (Issue 8 - normalize and merge)
  const careerData = useMemo(() => {
    const map = {};
    users.forEach(u => {
      if (u.careers && Array.isArray(u.careers)) {
        u.careers.forEach(c => {
          const n = normalizeCareer(c);
          if (n) map[n] = (map[n] || 0) + 1;
        });
      }
    });
    return groupCareerNames(map)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [users]);

  // Career stats from Holland
  const hollandCareerData = useMemo(() => {
    const hollandCareerMap = {
      R: 'Kỹ thuật / Công nghệ',
      I: 'Nghiên cứu / Khoa học',
      A: 'Nghệ thuật / Sáng tạo',
      S: 'Xã hội / Giáo dục',
      E: 'Kinh doanh / Quản lý',
      C: 'Hành chính / Tổ chức'
    };
    const map = {};
    results.forEach(r => {
      if (r.holland?.code) {
        const topCode = r.holland.code.charAt(0);
        const career = hollandCareerMap[topCode] || 'Khác';
        map[career] = (map[career] || 0) + 1;
      }
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
  }, [results]);

  // Career stats from MBTI
  const mbtiCareerData = useMemo(() => {
    const mbtiCareerMap = {
      INTJ: 'Chiến lược / Phân tích', INTP: 'Nghiên cứu / Khoa học',
      ENTJ: 'Quản lý / Lãnh đạo', ENTP: 'Khởi nghiệp / Sáng tạo',
      INFJ: 'Tư vấn / Tâm lý', INFP: 'Nghệ thuật / Viết lách',
      ENFJ: 'Giáo dục / Đào tạo', ENFP: 'Truyền thông / Marketing',
      ISTJ: 'Kế toán / Hành chính', ISFJ: 'Y tế / Chăm sóc',
      ESTJ: 'Quản trị / Tổ chức', ESFJ: 'Dịch vụ / Cộng đồng',
      ISTP: 'Kỹ thuật / Cơ khí', ISFP: 'Thiết kế / Mỹ thuật',
      ESTP: 'Kinh doanh / Bán hàng', ESFP: 'Giải trí / Sự kiện'
    };
    const map = {};
    results.forEach(r => {
      if (r.mbti?.type) {
        const career = mbtiCareerMap[r.mbti.type] || 'Khác';
        map[career] = (map[career] || 0) + 1;
      }
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
  }, [results]);

  // Career stats from DISC
  const discCareerData = useMemo(() => {
    const discCareerMap = {
      D: 'Quản lý / Lãnh đạo',
      I: 'Truyền thông / PR',
      S: 'Giáo dục / Y tế',
      C: 'Phân tích / Kỹ thuật'
    };
    const map = {};
    results.forEach(r => {
      if (r.disc?.dominant) {
        const career = discCareerMap[r.disc.dominant] || 'Khác';
        map[career] = (map[career] || 0) + 1;
      }
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
  }, [results]);

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

  // Get user info for a test result (Issue 3)
  function getUserForResult(result) {
    if (result.firestoreUserId && userMap[result.firestoreUserId]) {
      return userMap[result.firestoreUserId];
    }
    // Fallback: match by deviceId
    if (result.deviceId) {
      return users.find(u => u.deviceId === result.deviceId) || null;
    }
    return null;
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
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0a0f1e] border-r border-white/5 flex flex-col transition-all duration-300 shrink-0 fixed top-0 left-0 h-screen z-40`}>
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

      {/* Main content - Issue 4: add pt for header spacing */}
      <main className={`flex-1 overflow-y-auto ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Line: Daily registrations */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Đăng ký theo ngày (30 ngày)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={dailyRegistrations}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} interval="preserveStartEnd" tick={{ fontFamily: 'Be Vietnam Pro' }} />
                        <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} tick={{ fontFamily: 'Be Vietnam Pro' }} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} dot={false} name="Lượt đăng ký" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Issue 7: Xu hướng test theo ngày - moved from analytics to overview */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Xu hướng test theo ngày (30 ngày)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={dailyTests}>
                        <defs>
                          <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} interval="preserveStartEnd" tick={{ fontFamily: 'Be Vietnam Pro' }} />
                        <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} tick={{ fontFamily: 'Be Vietnam Pro' }} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Area type="monotone" dataKey="count" stroke="#10b981" fill="url(#colorTests)" strokeWidth={2} name="Lượt test" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Bar: Province distribution */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Top 10 Tỉnh/Thành phố</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={provinceData} layout="vertical" margin={{ left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis type="number" stroke="#64748b" fontSize={11} allowDecimals={false} tick={{ fontFamily: 'Be Vietnam Pro' }} />
                        <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={110} tick={{ fontFamily: 'Be Vietnam Pro' }} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Bar dataKey="value" fill="#6366f1" radius={[0, 8, 8, 0]} name="Số người" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie: Role distribution */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6">Phân bố vai trò</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={roleData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={4} dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          labelLine={{ stroke: '#64748b' }}
                        >
                          {roleData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
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

            {/* ===== TAB: RESULTS (Issue 2 + 3) ===== */}
            {activeTab === 'results' && (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/10">
                          {['#', 'Người dùng', 'Tests', 'Holland', 'MBTI', 'DISC', 'Ngày làm', ''].map(h => (
                            <th key={h} className="px-5 py-4 text-slate-400 font-be-vietnam text-xs uppercase tracking-wider font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.slice(0, 50).map((r, idx) => {
                          const linkedUser = getUserForResult(r);
                          return (
                            <React.Fragment key={r.id}>
                              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setExpandedResult(expandedResult === r.id ? null : r.id)}>
                                <td className="px-5 py-3.5 text-slate-500 font-be-vietnam text-xs">#{idx + 1}</td>
                                {/* Issue 3: Show linked user */}
                                <td className="px-5 py-3.5">
                                  {linkedUser ? (
                                    <div>
                                      <span className="text-white font-be-vietnam text-sm font-medium">{linkedUser.name}</span>
                                      <span className="block text-slate-500 font-be-vietnam text-[10px]">{linkedUser.phone}</span>
                                    </div>
                                  ) : (
                                    <span className="text-slate-600 font-be-vietnam text-xs italic">Ẩn danh</span>
                                  )}
                                </td>
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
                                  <td colSpan={8} className="px-5 py-4 bg-white/[0.02]">
                                    {/* Issue 3: Show full user info */}
                                    {linkedUser && (
                                      <div className="bg-blue-500/10 rounded-xl p-4 mb-4 border border-blue-500/20">
                                        <h4 className="text-blue-400 font-bold font-be-vietnam text-xs mb-2">👤 Thông tin người dùng</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-be-vietnam">
                                          <div><span className="text-slate-500">Họ tên:</span> <span className="text-white font-medium">{linkedUser.name}</span></div>
                                          <div><span className="text-slate-500">SĐT:</span> <span className="text-slate-300">{linkedUser.phone}</span></div>
                                          <div><span className="text-slate-500">Tỉnh:</span> <span className="text-slate-300">{linkedUser.province}</span></div>
                                          <div><span className="text-slate-500">Vai trò:</span> <span className="text-slate-300">{linkedUser.role}</span></div>
                                        </div>
                                      </div>
                                    )}
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
                                          <h4 className="text-indigo-400 font-bold mb-2">MBTI Scores</h4>
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
                                    {/* Issue 2: Render AI Analysis with markdown */}
                                    {r.aiAnalysis && (
                                      <div className="mt-4 bg-white/5 rounded-xl p-4 border border-white/10">
                                        <h4 className="text-amber-500 font-bold font-be-vietnam text-xs mb-3 flex items-center gap-2">
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                          AI Analysis
                                        </h4>
                                        <div
                                          className="max-h-96 overflow-y-auto pr-2 scrollbar-thin"
                                          dangerouslySetInnerHTML={{ __html: renderMarkdownDark(r.aiAnalysis) }}
                                        />
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===== TAB: ANALYTICS (Issue 1 + 5) ===== */}
            {activeTab === 'analytics' && (
              <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Radar: Holland average (Issue 5) */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6 text-base">Holland RIASEC trung bình</h3>
                    <ResponsiveContainer width="100%" height={320}>
                      <RadarChart data={hollandAvg} cx="50%" cy="50%" outerRadius="70%">
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" stroke="#cbd5e1" fontSize={12} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#cbd5e1' }} />
                        <PolarRadiusAxis stroke="#334155" fontSize={10} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#64748b' }} domain={[0, 100]} />
                        <Radar name="Trung bình %" dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} strokeWidth={2} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar: MBTI distribution (Issue 5) */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6 text-base">Phân bố MBTI</h3>
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={mbtiData} margin={{ bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#cbd5e1' }} interval={0} />
                        <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#64748b' }} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Bar dataKey="value" fill="#818cf8" radius={[8, 8, 0, 0]} name="Số lượt">
                          {mbtiData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie: DISC (Issue 5) */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-6 text-base">Phân bố DISC</h3>
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart>
                        <Pie data={discData} cx="50%" cy="50%" innerRadius={65} outerRadius={105} paddingAngle={4} dataKey="value"
                          label={({ name, percent, x, y }) => (
                            <text x={x} y={y} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: 'Be Vietnam Pro', fontSize: '12px', fill: '#e2e8f0', fontWeight: 600 }}>
                              {`${name} (${(percent * 100).toFixed(0)}%)`}
                            </text>
                          )}
                          labelLine={{ stroke: '#64748b', strokeWidth: 1 }}
                        >
                          {discData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Legend wrapperStyle={{ fontFamily: 'Be Vietnam Pro', fontSize: '12px', color: '#94a3b8' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Holland → Career */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-2 text-base">Xu hướng ngành nghề — Holland</h3>
                    <p className="text-slate-500 text-xs font-be-vietnam mb-6">Nhóm ngành theo mã RIASEC hàng đầu</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={hollandCareerData} layout="vertical" margin={{ left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis type="number" stroke="#64748b" fontSize={11} allowDecimals={false} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#64748b' }} />
                        <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={11} width={160} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#cbd5e1' }} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Bar dataKey="value" radius={[0, 8, 8, 0]} name="Số lượt">
                          {hollandCareerData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* MBTI → Career */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="font-be-vietnam font-bold text-white mb-2 text-base">Xu hướng ngành nghề — MBTI</h3>
                    <p className="text-slate-500 text-xs font-be-vietnam mb-6">Nhóm ngành theo tính cách MBTI</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={mbtiCareerData} layout="vertical" margin={{ left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis type="number" stroke="#64748b" fontSize={11} allowDecimals={false} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#64748b' }} />
                        <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={11} width={180} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#cbd5e1' }} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Bar dataKey="value" radius={[0, 8, 8, 0]} name="Số lượt">
                          {mbtiCareerData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* DISC → Career */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 lg:col-span-2">
                    <h3 className="font-be-vietnam font-bold text-white mb-2 text-base">Xu hướng ngành nghề — DISC</h3>
                    <p className="text-slate-500 text-xs font-be-vietnam mb-6">Nhóm ngành theo phong cách hành vi DISC</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={discCareerData} margin={{ bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#cbd5e1" fontSize={11} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#cbd5e1' }} interval={0} />
                        <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#64748b' }} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]} name="Số lượt">
                          {discCareerData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Issue 8: Popular careers (normalized) */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 lg:col-span-2">
                    <h3 className="font-be-vietnam font-bold text-white mb-2 text-base">Ngành nghề được quan tâm nhiều nhất</h3>
                    <p className="text-slate-500 text-xs font-be-vietnam mb-6">Dựa trên lựa chọn đăng ký của người dùng (đã gộp trùng)</p>
                    <ResponsiveContainer width="100%" height={Math.max(300, careerData.length * 40)}>
                      <BarChart data={careerData} layout="vertical" margin={{ left: 20, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis type="number" stroke="#64748b" fontSize={11} allowDecimals={false} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#64748b' }} />
                        <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={12} width={200} tick={{ fontFamily: 'Be Vietnam Pro', fill: '#cbd5e1' }} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Bar dataKey="value" radius={[0, 8, 8, 0]} name="Số lượt quan tâm">
                          {careerData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===== TAB: EXPORT (Issue 6) ===== */}
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
                      onClick={() => exportToExcel(users.map(u => ({
                        'Họ tên': u.name, 'SĐT': u.phone, 'Tỉnh/TP': u.province,
                        'Vai trò': u.role, 'Trường': u.school, 'Năm sinh': u.birthYear,
                        'Ngành quan tâm': (u.careers || []).join('; '),
                        'Ngày ĐK': formatDate(u.createdAt)
                      })), 'users')}
                      className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-be-vietnam font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Tải xuống Excel (.xlsx)
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
                      onClick={() => exportToExcel(results.map(r => {
                        const lu = getUserForResult(r);
                        return {
                          'Người dùng': lu?.name || 'Ẩn danh',
                          'SĐT': lu?.phone || '',
                          'Tests': (r.testsCompleted || []).join(', '),
                          'Holland Code': r.holland?.code || '',
                          'MBTI Type': r.mbti?.type || '',
                          'DISC Dominant': r.disc?.dominant || '',
                          'Holland Scores': r.holland?.percentages ? Object.entries(r.holland.percentages).map(([k,v]) => `${k}:${v}%`).join(', ') : '',
                          'MBTI Scores': r.mbti?.percentages ? Object.entries(r.mbti.percentages).map(([k,v]) => `${k}:${v}%`).join(', ') : '',
                          'DISC Scores': r.disc?.percentages ? Object.entries(r.disc.percentages).map(([k,v]) => `${k}:${v}%`).join(', ') : '',
                          'Ngày làm': formatDate(r.createdAt)
                        };
                      }), 'test_results')}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-be-vietnam font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Tải xuống Excel (.xlsx)
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
