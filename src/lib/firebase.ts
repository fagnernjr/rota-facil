import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB00O3qMQvoroScqAbcHzh_3Ab3-CB45n4",
  authDomain: "rota-facil-061.firebaseapp.com",
  projectId: "rota-facil-061",
  storageBucket: "rota-facil-061.firebasestorage.app",
  messagingSenderId: "576318298839",
  appId: "1:576318298839:web:0a8e9dd25fa529cbd82e92",
  measurementId: "G-S5WR2VJC03"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);