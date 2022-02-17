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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("hey");
    const q = query(collection(db, "users"));
    getDocs(q).then((snapshot) => {
      setUsers(snapshot.docs);
      console.log(snapshot.docs[0].data());
    });
  }, []);

  const handleLogin = async () => {
    const userCred = await signInWithPopup(getAuth(), new GoogleAuthProvider());
    const idToken = await userCred.user.getIdToken(true);
  };

  const UserList = () => {
    if (!users) return null;
    return (
      <>
        {users.map((user) => (
          <div key={user.id}>
            {user.data().name}: {user.data().status}
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <div>
        <UserList />
      </div>
    </div>
  );
}

export default App;
