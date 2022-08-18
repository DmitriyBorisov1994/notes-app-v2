import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
   apiKey: "AIzaSyAbnJqnqtyvWrvfLvmC5ckkUbd6zsq7lPs",
   authDomain: "auth-example-dborisov.firebaseapp.com",
   databaseURL: "https://auth-example-dborisov-default-rtdb.asia-southeast1.firebasedatabase.app/",
   projectId: "auth-example-dborisov",
   storageBucket: "auth-example-dborisov.appspot.com",
   messagingSenderId: "25687936789",
   appId: "1:25687936789:web:3c41ca9cf78f44eb85e31c"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);