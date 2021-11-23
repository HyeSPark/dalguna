import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB65t0ozaad_GfIf4FlrdXC2d8Lrp3Bkbk",
    authDomain: "dalguna-42d6a.firebaseapp.com",
    projectId: "dalguna-42d6a",
    storageBucket: "dalguna-42d6a.appspot.com",
    messagingSenderId: "192324330494",
    appId: "1:192324330494:web:8a5a89beaaf9a2029496af"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);