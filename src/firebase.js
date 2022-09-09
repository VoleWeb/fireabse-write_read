import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBCWeqVGafupZevpFTvOGocIWcbxVF7Q_w",
  authDomain: "fir-db-6aca4.firebaseapp.com",
  projectId: "fir-db-6aca4",
  storageBucket: "fir-db-6aca4.appspot.com",
  messagingSenderId: "820393973361",
  appId: "1:820393973361:web:492331ef35a77b2740edd0",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
