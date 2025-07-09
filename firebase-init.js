const firebaseConfig = {
  apiKey: "AIzaSyBFvKq4Bx4b33ZZTBjTEfB1x6z10d-pd2A",
  authDomain: "akhtransapp.firebaseapp.com",
  projectId: "akhtransapp",
  storageBucket: "akhtransapp.appspot.com",
  messagingSenderId: "960895665450",
  appId: "1:960895665450:web:52d8efb64b76c2392602f5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
