// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNmYAvGlGOImFQvZxt3Fu8Zl3L3OTf8hQ",
  authDomain: "reels-2525.firebaseapp.com",
  projectId: "reels-2525",
  storageBucket: "reels-2525.appspot.com",
  messagingSenderId: "932807369439",
  appId: "1:932807369439:web:9ab36ec9eab9f56be0bf6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
const storage=getStorage();
const db=getFirestore();

export {auth,storage,db};
export default app;