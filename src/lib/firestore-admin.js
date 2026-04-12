import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export async function fetchAllUsers() {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchAllTestResults() {
  const q = query(collection(db, 'test_results'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function deleteUser(docId) {
  await deleteDoc(doc(db, 'users', docId));
}

export async function deleteTestResult(docId) {
  await deleteDoc(doc(db, 'test_results', docId));
}

export function exportToCSV(data, filename) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(h => {
        let val = row[h];
        if (val && typeof val === 'object') {
          if (val.seconds) {
            val = new Date(val.seconds * 1000).toLocaleString('vi-VN');
          } else {
            val = JSON.stringify(val);
          }
        }
        if (val === null || val === undefined) val = '';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      }).join(',')
    )
  ];
  const csvString = '\uFEFF' + csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
