// localStorage helpers for saving test results
// Key: 'career_test_history'
// Value: array of result objects

const STORAGE_KEY = 'career_test_history';
const CURRENT_TEST_KEY = 'career_test_current';
const MAX_HISTORY_ITEMS = 20; // Keep max 20 results to avoid filling localStorage

export function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function saveResult(result) {
  try {
    const history = getHistory();
    const newResult = {
      ...result,
      id: generateId(),
      date: new Date().toISOString()
    };
    history.unshift(newResult); // Add to beginning

    // Auto-prune: keep only MAX_HISTORY_ITEMS most recent
    const trimmed = history.slice(0, MAX_HISTORY_ITEMS);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (quotaError) {
      // localStorage is full - progressively remove oldest items until it fits
      console.warn('localStorage near full, removing old history entries...');
      let items = trimmed;
      while (items.length > 1) {
        items = items.slice(0, -1); // Remove oldest item
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
          console.log(`Pruned history to ${items.length} items to free space`);
          break;
        } catch (e) {
          // Still too big, keep removing
          continue;
        }
      }
      // If even 1 item doesn't fit, clear everything
      if (items.length <= 1) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify([newResult]));
        } catch (e) {
          localStorage.removeItem(STORAGE_KEY);
          console.error('Unable to save to localStorage at all');
        }
      }
    }

    return newResult.id;
  } catch (error) {
    console.error('Error saving result:', error);
    throw error;
  }
}

export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}

export function getResultById(id) {
  try {
    const history = getHistory();
    return history.find(r => r.id === id) || null;
  } catch (error) {
    console.error('Error getting result:', error);
    return null;
  }
}

export function deleteHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error deleting history:', error);
    return false;
  }
}

export function deleteResultById(id) {
  try {
    const history = getHistory();
    const filtered = history.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting result:', error);
    return false;
  }
}

export function updateResultAIAnalysis(id, analysis) {
  try {
    const history = getHistory();
    const index = history.findIndex(r => r.id === id);
    if (index !== -1) {
      history[index].aiAnalysis = analysis;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating AI analysis:', error);
    return false;
  }
}

// Save current test progress (for resuming later)
export function saveCurrentTest(testType, currentIndex, answers) {
  try {
    const data = {
      testType,
      currentIndex,
      answers,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(CURRENT_TEST_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving current test:', error);
    return false;
  }
}

export function getCurrentTest() {
  try {
    const data = localStorage.getItem(CURRENT_TEST_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting current test:', error);
    return null;
  }
}

export function clearCurrentTest() {
  try {
    localStorage.removeItem(CURRENT_TEST_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing current test:', error);
    return false;
  }
}

export function savePartialResult(testType, data) {
  try {
    const key = `career_test_partial_${testType}`;
    localStorage.setItem(key, JSON.stringify({
      ...data,
      savedAt: new Date().toISOString()
    }));
    return true;
  } catch (error) {
    console.error('Error saving partial result:', error);
    return false;
  }
}

export function getPartialResult(testType) {
  try {
    const key = `career_test_partial_${testType}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting partial result:', error);
    return null;
  }
}

export function clearPartialResult(testType) {
  try {
    const key = `career_test_partial_${testType}`;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing partial result:', error);
    return false;
  }
}

export function getUserInfo() {
  try {
    const data = localStorage.getItem('career_test_user_info');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}

export default {
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
  savePartialResult,
  getPartialResult,
  clearPartialResult,
  getUserInfo
};