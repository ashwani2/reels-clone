/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

//next inbuilt image tag
import Image from "next/image";
import insta from "../../assets/insta.png";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth.js";
import {storage,db} from "../../firebase.js";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {doc,setDoc} from "firebase/firestore";

function Index() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { signup, user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");
      const user=await signup(email, password);
      console.log("Signed Up!!");

      const storageRef = ref(storage, `${user.uid}/Profile`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          //handle unsuccesfull uploads
          console.log(error)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            let obj={
              name:name,
              email:email,
              uid:user.user.uid,
              photoURL:downloadURL,
              posts:[]
            }

            // to add documents in firestore and we can copy this function form firestore
            await setDoc(doc(db,"users",user.user.uid),obj)
            console.log("document added");
          });
        }
      );

    } catch (err) {
      console.log(err);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      console.log("User Not Present");
    }
  }, [user]);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <Image src={insta} alt="logo" />
        <TextField
          id="outlined-basic"
          size="small"
          margin="dense"
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          size="small"
          type="password"
          margin="dense"
          fullWidth
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          size="small"
          margin="dense"
          fullWidth
          label="Full Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="outlined"
          fullWidth
          component="label"
          style={{ marginTop: "1rem" }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          Upload
        </Button>
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: "1rem" }}
          onClick={handleClick}
        >
          Sign Up
        </Button>
      </div>
      <div className="bottom-card">
        Already Have an Account?{" "}
        <Link href="/login">
          <span style={{ color: "blue" }}>Login</span>
        </Link>
      </div>
    </div>
  );
}

export default Index;
