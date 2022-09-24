import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_YvoqyjiW9BXND0uCFYyqd6zVl-WBA5U",
  authDomain: "foodistan-3bf7d.firebaseapp.com",
  projectId: "foodistan-3bf7d",
  storageBucket: "foodistan-3bf7d.appspot.com",
  messagingSenderId: "503873460879",
  appId: "1:503873460879:web:22b80dfd3b8284def7aefa",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
