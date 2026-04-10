import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  generateId,
  saveResult,
  getHistory,
  getResultById,
  deleteHistory,
  deleteResultById,
  updateResultAIAnalysis,
  saveCurrentTest,
  getCurrentTest,
  clearCurrentTest,
  getUserInfo
} from '../storage.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = String(value); }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; })
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

// ==================== generateId ====================

describe('generateId', () => {
  it('tạo UUID v4 đúng format', () => {
    const id = generateId();
    // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('tạo ID unique mỗi lần gọi', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});

// ==================== saveResult / getHistory ====================

describe('saveResult & getHistory', () => {
  it('lưu và đọc lại kết quả thành công', () => {
    const result = { testsCompleted: ['holland'], holland: { code: 'RIA' } };
    const id = saveResult(result);

    expect(id).toBeDefined();
    const history = getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].id).toBe(id);
    expect(history[0].holland.code).toBe('RIA');
  });

  it('thêm kết quả mới lên đầu danh sách (mới nhất trước)', () => {
    saveResult({ testsCompleted: ['holland'] });
    saveResult({ testsCompleted: ['mbti'] });

    const history = getHistory();
    expect(history[0].testsCompleted).toEqual(['mbti']);
    expect(history[1].testsCompleted).toEqual(['holland']);
  });

  it('giới hạn tối đa 20 kết quả', () => {
    for (let i = 0; i < 25; i++) {
      saveResult({ testsCompleted: ['holland'], index: i });
    }

    const history = getHistory();
    expect(history.length).toBeLessThanOrEqual(20);
  });

  it('mỗi kết quả có date ISO string', () => {
    saveResult({ testsCompleted: ['holland'] });
    const history = getHistory();

    expect(history[0].date).toBeDefined();
    expect(new Date(history[0].date).toISOString()).toBe(history[0].date);
  });

  it('trả về mảng rỗng khi chưa có lịch sử', () => {
    const history = getHistory();
    expect(history).toEqual([]);
  });
});

// ==================== getResultById ====================

describe('getResultById', () => {
  it('tìm đúng kết quả theo ID', () => {
    const id = saveResult({ testsCompleted: ['mbti'], mbti: { type: 'INTJ' } });
    const found = getResultById(id);

    expect(found).not.toBeNull();
    expect(found.mbti.type).toBe('INTJ');
  });

  it('trả về null khi không tìm thấy ID', () => {
    const result = getResultById('non-existent-id');
    expect(result).toBeNull();
  });
});

// ==================== deleteHistory / deleteResultById ====================

describe('deleteHistory', () => {
  it('xoá toàn bộ lịch sử', () => {
    saveResult({ testsCompleted: ['holland'] });
    saveResult({ testsCompleted: ['mbti'] });

    const ok = deleteHistory();
    expect(ok).toBe(true);

    const history = getHistory();
    expect(history).toEqual([]);
  });
});

describe('deleteResultById', () => {
  it('xoá đúng kết quả theo ID', () => {
    const id1 = saveResult({ testsCompleted: ['holland'] });
    const id2 = saveResult({ testsCompleted: ['mbti'] });

    deleteResultById(id1);

    const history = getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].id).toBe(id2);
  });

  it('không ảnh hưởng kết quả khác', () => {
    const id1 = saveResult({ testsCompleted: ['holland'] });
    saveResult({ testsCompleted: ['mbti'] });

    deleteResultById(id1);

    const history = getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].testsCompleted).toEqual(['mbti']);
  });
});

// ==================== updateResultAIAnalysis ====================

describe('updateResultAIAnalysis', () => {
  it('cập nhật AI analysis cho kết quả đã lưu', () => {
    const id = saveResult({ testsCompleted: ['holland'], aiAnalysis: null });
    const updated = updateResultAIAnalysis(id, 'AI says you should be engineer');

    expect(updated).toBe(true);
    const result = getResultById(id);
    expect(result.aiAnalysis).toBe('AI says you should be engineer');
  });

  it('trả về false khi ID không tồn tại', () => {
    const result = updateResultAIAnalysis('fake-id', 'some text');
    expect(result).toBe(false);
  });
});

// ==================== saveCurrentTest / getCurrentTest / clearCurrentTest ====================

describe('Current test progress', () => {
  it('lưu và đọc lại tiến trình bài test', () => {
    saveCurrentTest('holland', 5, { R: [5, 4, 3] });
    const current = getCurrentTest();

    expect(current.testType).toBe('holland');
    expect(current.currentIndex).toBe(5);
    expect(current.answers.R).toEqual([5, 4, 3]);
  });

  it('xoá tiến trình bài test', () => {
    saveCurrentTest('mbti', 10, {});
    clearCurrentTest();
    const current = getCurrentTest();

    expect(current).toBeNull();
  });

  it('trả về null khi chưa có tiến trình', () => {
    const current = getCurrentTest();
    expect(current).toBeNull();
  });
});

// ==================== getUserInfo ====================

describe('getUserInfo', () => {
  it('trả về null khi chưa có thông tin user', () => {
    const info = getUserInfo();
    expect(info).toBeNull();
  });

  it('trả về thông tin user đã lưu', () => {
    const userInfo = { name: 'Nguyễn Văn A', phone: '0123456789', province: 'Hải Phòng' };
    localStorageMock.setItem('career_test_user_info', JSON.stringify(userInfo));

    const info = getUserInfo();
    expect(info.name).toBe('Nguyễn Văn A');
    expect(info.province).toBe('Hải Phòng');
  });
});
