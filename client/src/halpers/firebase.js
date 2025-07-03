import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "blogging-32856.firebaseapp.com",
  projectId: "blogging-32856",
  storageBucket: "blogging-32856.firebasestorage.app",
  messagingSenderId: "164401808306",
  appId: "1:164401808306:web:7e5c0d77e6856d1c865aab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };