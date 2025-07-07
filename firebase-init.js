
const firebaseConfig = {
  apiKey: "AIzaSyBxD-bUWAFmlAxzrgvdl5meMc9GjIDz0XA",
  authDomain: "akhtransapp.firebaseapp.com",
  projectId: "akhtransapp",
  storageBucket: "akhtransapp.appspot.com",
  messagingSenderId: "960895665450",
  appId: "1:960895665450:web:52d8efb64b76c2392602f5"
};

// Inicializácia (iba ak ešte nebola)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
