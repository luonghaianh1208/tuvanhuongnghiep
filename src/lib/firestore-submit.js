import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { generateId } from './storage';

const DEVICE_ID_KEY = 'career_test_device_id';

function getDeviceId() {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = generateId();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

/**
 * Ghi thông tin đăng ký HS vào Firestore collection 'users'.
 * Gọi tại: UserInfoModal.jsx (khi HS đăng ký lần đầu)
 * @returns {string|null} Firestore document ID hoặc null nếu lỗi
 */
export async function submitUserInfo(userInfo) {
  try {
    const deviceId = getDeviceId();

    const docRef = await addDoc(collection(db, 'users'), {
      name: userInfo.name || '',
      phone: userInfo.phone || '',
      province: userInfo.province || '',
      role: userInfo.role || '',
      birthYear: userInfo.birthYear || null,
      school: userInfo.school || '',
      careers: userInfo.careers || [],
      deviceId,
      createdAt: serverTimestamp()
    });

    // Lưu Firestore doc ID vào localStorage để link với test_results
    localStorage.setItem('firestore_user_id', docRef.id);
    console.log('User info submitted to Firestore:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting user info to Firestore:', error);
    return null;
  }
}

/**
 * Ghi kết quả test + phân tích vào Firestore collection 'test_results'.
 * Gọi tại: ResultPage.jsx (khi HS hoàn thành test)
 * @param {object} params
 * @param {object} params.holland - Kết quả Holland (scores, percentages, code)
 * @param {object} params.mbti - Kết quả MBTI (type, counts, percentages)
 * @param {object} params.disc - Kết quả DISC (scores, percentages, style)
 * @param {object} params.rawAnswers - Câu trả lời gốc {holland: {...}, mbti: {...}, disc: {...}}
 * @param {string} params.aiAnalysis - Text phân tích AI (optional)
 * @returns {string|null} Firestore document ID hoặc null nếu lỗi
 */
export async function submitTestResults({ holland, mbti, disc, rawAnswers, aiAnalysis }) {
  try {
    const deviceId = getDeviceId();
    const firestoreUserId = localStorage.getItem('firestore_user_id') || null;

    const testsCompleted = [
      holland ? 'holland' : null,
      mbti ? 'mbti' : null,
      disc ? 'disc' : null
    ].filter(Boolean);

    const data = {
      deviceId,
      firestoreUserId,
      testsCompleted,
      createdAt: serverTimestamp()
    };

    // Holland results (chỉ lưu scores/percentages/code, không lưu topCareers)
    if (holland) {
      data.holland = {
        code: holland.code || '',
        scores: holland.scores || {},
        percentages: holland.percentages || {}
      };
    }

    // MBTI results
    if (mbti) {
      data.mbti = {
        type: mbti.type || '',
        counts: mbti.counts || {},
        percentages: mbti.percentages || {}
      };
    }

    // DISC results
    if (disc) {
      data.disc = {
        style: disc.style || '',
        dominant: disc.dominant || '',
        scores: disc.scores || {},
        percentages: disc.percentages || {}
      };
    }

    // Raw answers (câu trả lời gốc của HS)
    if (rawAnswers) {
      data.rawAnswers = rawAnswers;
    }

    // AI Analysis text
    if (aiAnalysis) {
      data.aiAnalysis = aiAnalysis;
    }

    const docRef = await addDoc(collection(db, 'test_results'), data);
    
    // Lưu ID để có thể update AI analysis sau
    localStorage.setItem('firestore_result_id', docRef.id);
    console.log('Test results submitted to Firestore:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting test results to Firestore:', error);
    return null;
  }
}

export default {
  submitUserInfo,
  submitTestResults
};
