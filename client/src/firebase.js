import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estatics-ebb5f.firebaseapp.com",
  projectId: "estatics-ebb5f",
  storageBucket: "estatics-ebb5f.appspot.com",
  messagingSenderId: "974266087210",
  appId: "1:974266087210:web:8042be3c08f8770ae31053"
};

export const app = initializeApp(firebaseConfig);