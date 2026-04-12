import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB5Ld945drn6RzhepNSmL_jgydiEvMqIuQ",
  authDomain: "tuvan-huong-nghiep.firebaseapp.com",
  projectId: "tuvan-huong-nghiep",
  storageBucket: "tuvan-huong-nghiep.firebasestorage.app",
  messagingSenderId: "145644870605",
  appId: "1:145644870605:web:fd2faa24d189c3002fc284"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
