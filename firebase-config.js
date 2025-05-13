// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4mCJkeKsavTIltUWyORFP_VGOtnWbnvo",
  authDomain: "my-question-bo.firebaseapp.com",
  projectId: "my-question-bo",
  storageBucket: "my-question-bo.firebasestorage.app",
  messagingSenderId: "447067890479",
  appId: "1:447067890479:web:dcbff4d25d30940cb237da"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
