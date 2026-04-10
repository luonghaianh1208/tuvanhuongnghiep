import React, { useState, useEffect } from 'react';
import { submitToGoogleSheet } from '../lib/google-sheets';

// 34 tỉnh/thành phố theo yêu cầu, đã được sắp xếp theo bảng chữ cái A-Z
const PROVINCES = [
  'Thành phố Cần Thơ',
  'Thành phố Đà Nẵng',
  'Thành phố Hà Nội',
  'Thành phố Hải Phòng',
  'Thành phố Hồ Chí Minh',
  'Thành phố Huế',
  'Tỉnh An Giang',
  'Tỉnh Bắc Ninh',
  'Tỉnh Cà Mau',
  'Tỉnh Cao Bằng',
  'Tỉnh Điện Biên',
  'Tỉnh Đắk Lắk',
  'Tỉnh Đồng Nai',
  'Tỉnh Đồng Tháp',
  'Tỉnh Gia Lai',
  'Tỉnh Hà Tĩnh',
  'Tỉnh Hưng Yên',
  'Tỉnh Khánh Hòa',
  'Tỉnh Lai Châu',
  'Tỉnh Lâm Đồng',
  'Tỉnh Lạng Sơn',
  'Tỉnh Lào Cai',
  'Tỉnh Nghệ An',
  'Tỉnh Ninh Bình',
  'Tỉnh Phú Thọ',
  'Tỉnh Quảng Ngãi',
  'Tỉnh Quảng Ninh',
  'Tỉnh Quảng Trị',
  'Tỉnh Sơn La',
  'Tỉnh Tây Ninh',
  'Tỉnh Thái Nguyên',
  'Tỉnh Thanh Hóa',
  'Tỉnh Tuyên Quang',
  'Tỉnh Vĩnh Long'
];

const USER_INFO_KEY = 'career_test_user_info';

function UserInfoModal({ onSubmit }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [roleOther, setRoleOther] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [careers, setCareers] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedInfo = localStorage.getItem(USER_INFO_KEY);
    if (!savedInfo) {
      setIsVisible(true);
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
    if (!role) newErrors.role = 'Vui lòng chọn đối tượng';
    if (role === 'Khác' && !roleOther.trim()) newErrors.roleOther = 'Vui lòng điền cụ thể';
    if (!phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^0[0-9]{9}$/.test(phone.trim())) newErrors.phone = 'Số điện thoại phải gồm 10 số, bắt đầu bằng số 0';
    if (!province) newErrors.province = 'Vui lòng chọn Tỉnh/Thành phố';
    if (!careers.trim()) newErrors.careers = 'Vui lòng nhập ngành nghề quan tâm';
    if (!acceptedPrivacy) newErrors.privacy = 'Vui lòng đồng ý với chính sách bảo mật';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const userInfo = {
      name: name.trim(),
      role: role === 'Khác' ? roleOther.trim() : role,
      phone: phone.trim(),
      province,
      careers: careers.split(',').map(c => c.trim()).filter(c => c), // Mảng các ngành nghề
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));

    // Gửi thông tin lên Google Sheets ngay khi người dùng điền (không có testResults)
    // catch error so we don't block the user if GAS script URL isn't set yet or fails.
    try {
      await submitToGoogleSheet(userInfo, {}, '');
    } catch (err) {
      console.warn('Kết nối Google Sheets bị lỗi hoặc chưa thiết lập URL, nhưng vẫn lưu cục bộ cho người dùng tiếp tục.', err);
    }

    setIsVisible(false);
    setIsSubmitting(false);
    if (onSubmit) onSubmit(userInfo);
  };

  const roles = [
    'HS tiểu học',
    'HS Trung học cơ sở',
    'HS Trung học phổ thông',
    'Sinh viên',
    'Khác'
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Container modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy to-navy-light text-white p-5 sm:p-6 rounded-t-2xl sticky top-0 z-10 shadow-sm">
          <h2 className="font-be-vietnam font-bold text-xl sm:text-2xl mb-1">
            Thông tin người dùng
          </h2>
          <p className="font-be-vietnam text-gold text-sm">
            Vui lòng điền đầy đủ các thông tin bắt buộc (*) để tiếp tục sử dụng ứng dụng.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          
          {/* Họ và tên */}
          <div>
            <label className="block font-be-vietnam font-medium text-navy mb-1.5 text-sm">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Nguyễn Văn A"
              className={`w-full px-4 py-2.5 border rounded-lg font-be-vietnam text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-navy/30 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-navy/30'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-be-vietnam">{errors.name}</p>}
          </div>

          {/* Đối tượng */}
          <div>
            <label className="block font-be-vietnam font-medium text-navy mb-1.5 text-sm">
              Đang là <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => { setRole(r); if(r !== 'Khác') setRoleOther(''); }}
                  className={`px-3 py-2 rounded-lg font-be-vietnam text-sm transition-colors border text-left flex items-center justify-center sm:justify-start ${
                    role === r
                      ? 'bg-navy text-white border-navy font-semibold'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-navy/30'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            {role === 'Khác' && (
              <input
                type="text"
                value={roleOther}
                onChange={(e) => setRoleOther(e.target.value)}
                placeholder="Vui lòng điền cụ thể vai trò của bạn..."
                className={`w-full px-4 py-2.5 mt-2 border rounded-lg font-be-vietnam text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-navy/30 ${errors.roleOther ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-navy/30'}`}
              />
            )}
            {errors.role && <p className="text-red-500 text-xs mt-1 font-be-vietnam">{errors.role}</p>}
            {errors.roleOther && <p className="text-red-500 text-xs mt-1 font-be-vietnam">{errors.roleOther}</p>}
          </div>

          {/* SĐT */}
          <div>
            <label className="block font-be-vietnam font-medium text-navy mb-1.5 text-sm">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="VD: 0912345678"
              className={`w-full px-4 py-2.5 border rounded-lg font-be-vietnam text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-navy/30 ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-navy/30'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1 font-be-vietnam">{errors.phone}</p>}
          </div>

          {/* Tỉnh/Thành phố */}
          <div>
            <label className="block font-be-vietnam font-medium text-navy mb-1.5 text-sm">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg font-be-vietnam text-sm transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 ${errors.province ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-navy/30'}`}
            >
              <option value="" disabled>-- Chọn Tỉnh/Thành phố --</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.province && <p className="text-red-500 text-xs mt-1 font-be-vietnam">{errors.province}</p>}
          </div>

          {/* Ngành nghề quan tâm */}
          <div>
            <label className="block font-be-vietnam font-medium text-navy mb-1.5 text-sm">
              Ngành nghề đang quan tâm <span className="text-red-500">*</span>
            </label>
            <textarea
              value={careers}
              onChange={(e) => setCareers(e.target.value)}
              placeholder="VD: Công nghệ thông tin, Thiết kế đồ họa, Marketing..."
              rows={2}
              className={`w-full px-4 py-2.5 border rounded-lg font-be-vietnam text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-navy/30 resize-none ${errors.careers ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-navy/30'}`}
            />
            {errors.careers && <p className="text-red-500 text-xs mt-1 font-be-vietnam">{errors.careers}</p>}
            <p className="text-amber-600 text-[11px] sm:text-xs mt-1 font-be-vietnam font-medium italic">
              * Nhập nhiều ngành nghề, ngăn cách với nhau bằng dấu phẩy (,).
            </p>
          </div>

          {/* Privacy Policy */}
          <div className="flex items-start mt-2">
            <div className="flex items-center h-5">
              <input
                id="privacy"
                type="checkbox"
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className={`w-4 h-4 rounded focus:ring-navy/30 transition-colors ${errors.privacy ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            <label htmlFor="privacy" className="ml-2 text-sm font-be-vietnam text-gray-600">
              Tôi đã đọc và đồng ý với <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-navy hover:underline font-semibold">Chính sách bảo mật</a> <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.privacy && <p className="text-red-500 text-xs mt-1 font-be-vietnam">{errors.privacy}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 mt-4 font-be-vietnam font-bold rounded-xl transition-all shadow-md flex items-center justify-center ${
              isSubmitting
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-gold hover:bg-gold-dark text-navy hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang lưu thông tin...
              </>
            ) : 'Bắt đầu sử dụng 👉'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInfoModal;