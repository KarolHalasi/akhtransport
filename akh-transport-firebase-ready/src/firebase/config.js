import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBw4TFz1eHp87U0rEk42UO5TZPQacXDoxM",
  authDomain: "akhtransapp.firebaseapp.com",
  projectId: "akhtransapp",
  storageBucket: "akhtransapp.firebasestorage.app",
  messagingSenderId: "923896774862",
  appId: "1:923896774862:web:71288c0fe7ede5933fd09f",
  measurementId: "G-6MW265X1MV"
};

export const app = initializeApp(firebaseConfig);
