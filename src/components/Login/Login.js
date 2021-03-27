import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [userInfo, setUserInfo] = useContext(userContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  var provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const userData = result.user;
        const { displayName, email, photoURL } = userData;
        setUserInfo(userData);
        history.replace(from);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleGoogleLogin}>Google Login</button>
    </div>
  );
};

export default Login;
