import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDWV-eIx3u9zZkKGXduQjwnXalUdhPNkow",
  authDomain: "fir-crud-2ad2f.firebaseapp.com",
  projectId: "fir-crud-2ad2f",
  storageBucket: "fir-crud-2ad2f.firebasestorage.app",
  messagingSenderId: "149515946786",
  appId: "1:149515946786:web:f9169b1cedc5d9992e737b",
  measurementId: "G-EX3ZGJPGGF",
  databaseURL: "fir-crud-2ad2f-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };