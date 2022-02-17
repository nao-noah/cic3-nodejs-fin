import logo from "./logo.svg";
import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";

function App() {
  const handleLogin = async () => {
    const userCred = await signInWithPopup(getAuth(), new GoogleAuthProvider());
    const idToken = await userCred.user.getIdToken(true);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
