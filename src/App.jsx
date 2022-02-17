import logo from "./logo.svg";
import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
// import { firestore } from "firebase";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUsejb-aUu2avQslELDM_qsUMAOzYWI14",
  authDomain: "ciccc-nodejs-fin2.firebaseapp.com",
  projectId: "ciccc-nodejs-fin2",
  storageBucket: "ciccc-nodejs-fin2.appspot.com",
  messagingSenderId: "589239819826",
  appId: "1:589239819826:web:379a2953bb109a72eb262b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

function App() {
  const [user, setUser] = useState(null);
  const [me, setMe] = useState(null);

  useEffect(() => {
    if (!me?.email) return;

    const docRef = doc(db, "users", me.email);
    getDoc(docRef).then((docSnap) => {
      if (!docSnap.exists()) {
        console.log("this user doc doesn't exist");
        return;
      }
      setUser(docSnap.data());
    });
  }, [me?.email]);

  const handleLogin = () => {
    signInWithPopup(getAuth(), new GoogleAuthProvider()).then((userCred) => {
      const email = userCred.user.email;
      const name = userCred.user.displayName;

      setMe({ email, name });
      setDoc(doc(db, "users", email), { status: "" });
    });
  };

  const Me = () => {
    return (
      <div>
        <div>You</div>
        <div>
          {me.name}: {user?.status}
        </div>
      </div>
    );
  };

  return (
    <div>{me ? <Me /> : <button onClick={handleLogin}>Login</button>}</div>
  );
}

export default App;
