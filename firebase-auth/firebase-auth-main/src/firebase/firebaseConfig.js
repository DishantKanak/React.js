// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT2womfnr3_6Uy6uJlMeSPyCyhVMRfFcY",
  authDomain: "fir-auth-5b3b5.firebaseapp.com",
  databaseURL: "https://fir-auth-5b3b5-default-rtdb.firebaseio.com",
  projectId: "fir-auth-5b3b5",
  storageBucket: "fir-auth-5b3b5.firebasestorage.app",
  messagingSenderId: "862515095416",
  appId: "1:862515095416:web:b6e3ff69deda7440b80a8d",
  measurementId: "G-CVME82EPPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only when running in a browser
let analytics;
try {
  if (typeof window !== "undefined") analytics = getAnalytics(app);
} catch (e) {
  // analytics may fail in non-browser environments — ignore
}

// Export auth for use across the app
export const auth = getAuth(app);
// Export Realtime Database instance
export const db = getDatabase(app);
export default app;