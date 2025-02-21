import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';


const firebaseConfig = {
    apiKey: "AIzaSyBY3NgqSvRY-b8k4p0tJVx9H18hCAXcR8E",
    authDomain: "chatapp-946ad.firebaseapp.com",
    databaseURL: "https://chatapp-946ad-default-rtdb.firebaseio.com",
    projectId: "chatapp-946ad",
    storageBucket: "chatapp-946ad.firebasestorage.app",
    messagingSenderId: "380471305581",
    appId: "1:380471305581:web:512758f7acf362b39d2664"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export default app; 