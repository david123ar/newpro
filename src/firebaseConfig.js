// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqhP5-NYkUjT6kTr5DQheIYSqC1ESQwQ0",
  authDomain: "anito-d2270.firebaseapp.com",
  databaseURL: "https://anito-d2270-default-rtdb.firebaseio.com",
  projectId: "anito-d2270",
  storageBucket: "anito-d2270.appspot.com",
  messagingSenderId: "461138418972",
  appId: "1:461138418972:web:bb38db324c4382b936eed9",
  measurementId: "G-Y81ZRXNW2N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
