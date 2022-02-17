import logo from "./logo.svg";
import "./App.scss";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut,
  onAuthStateChanged,
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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const email = user.email;
        const name = user.displayName;

        setMe({ email, name });
      } else {
        setMe(null);
        setUser(null);
        setIsEditing(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!me?.email) return;

    const docRef = doc(db, "users", me.email);
    getDoc(docRef).then((docSnap) => {
      if (!docSnap.exists()) {
        console.log("this user doc doesn't exist");
        return;
      }
      console.log("fine user", docSnap.data());
      setUser(docSnap.data());
    });
  }, [me?.email]);

  const handleLogin = () => {
    signInWithPopup(getAuth(), new GoogleAuthProvider()).then((userCred) => {
      const email = userCred.user.email;
      const name = userCred.user.displayName;

      setMe({ email, name });
      setDoc(doc(db, "users", email));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setDoc(doc(db, "users", me.email), { status: user.status });
  };

  return (
    <div className="AppWrapper">
      <h1>Shout Your Current Status</h1>
      {me ? (
        <div>
          <div className="shouting">
            My name is {me.name}.<br />
            I'm shouting <span>{user?.status}</span>!!!
          </div>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => {
                  setUser((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                }}
                value={user.status}
              />
              <input type="submit" value="SUBMIT" />
            </form>
          ) : (
            <button className="shoutButton" onClick={() => setIsEditing(true)}>
              Edit Your Shout
            </button>
          )}
          <button
            onClick={() => {
              signOut(getAuth());
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login to Get Started</button>
      )}
    </div>
  );
}

export default App;
