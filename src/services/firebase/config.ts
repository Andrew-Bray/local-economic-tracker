import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace with your actual Firebase config when ready
const firebaseConfig = {
  apiKey: "MY_API_KEY",
  authDomain: "MY_PROJECT_ID.firebaseapp.com",
  projectId: "MY_PROJECT_ID",
  storageBucket: "MY_PROJECT_ID.appspot.com",
  messagingSenderId: "MY_MESSAGING_SENDER_ID",
  appId: "MY_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };