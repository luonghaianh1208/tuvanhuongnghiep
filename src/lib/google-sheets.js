// Gửi dữ liệu lên Google Sheets qua GAS Web App

const GAS_WEBAPP_URL = 'YOUR_GAS_WEBAPP_URL_HERE'; // Thay bằng URL từ GAS deploy

export async function submitToGoogleSheet(userInfo, testResults = {}, aiAnalysis = '') {
  try {
    const url = getGASWebAppURL();
    if (!url || url === 'YOUR_GAS_WEBAPP_URL_HERE') {
      console.warn('VITE_GAS_WEBAPP_URL chưa được thiết lập. Bỏ qua việc gửi lên Google Sheets.');
      return null;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      name: userInfo.name,
      role: userInfo.role,
      phone: userInfo.phone,
      province: userInfo.province,
      careers: userInfo.careers, // Array - sẽ được tách ra nhiều cột trong GAS
      testsCompleted: testResults.testsCompleted || [],
      hollandCode: testResults.hollandCode || null,
      mbtiType: testResults.mbtiType || null,
      discStyle: testResults.discStyle || null,
      aiAnalysis: aiAnalysis
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Data submitted to Google Sheet:', result);
    return result;
  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
    throw error;
  }
}

// Lấy URL từ localStorage hoặc env
export function getGASWebAppURL() {
  return localStorage.getItem('gas_webapp_url') || import.meta.env.VITE_GAS_WEBAPP_URL;
}

// Lưu URL vào localStorage (khi user config)
export function setGASWebAppURL(url) {
  localStorage.setItem('gas_webapp_url', url);
}

// Check xem đã config chưa
export function isGASConfigured() {
  const url = getGASWebAppURL();
  return url && url !== 'YOUR_GAS_WEBAPP_URL_HERE' && url.startsWith('https://script.google.com');
}

export default {
  submitToGoogleSheet,
  getGASWebAppURL,
  setGASWebAppURL,
  isGASConfigured
};