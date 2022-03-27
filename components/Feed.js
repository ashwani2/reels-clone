import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Upload from "./Upload";

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase";
import { AuthContext } from "../context/auth";
import Post from "./Post.js";

function Feed() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(user.uid);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      //unsub is just like an event
      setUserData(doc.data());
      console.log(doc.data());
    });

    return () => {
      unsub(); //after perfoming the task removing the event
    };
  }, [user]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        let tempArray = [];
        snapshot.docs.map((doc) => {
          tempArray.push(doc.data());
        });
        setPosts([...tempArray]);
        console.log(tempArray);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="feed-container">
      {/* Navbar */}
      <Navbar userData={userData} />
      {/* Upload Button */}
      <Upload userData={userData} />
      {/* Reels display area */}
      <div className="videos-container">
        {posts.map((post, index) => {
          return <Post key={index} postData={post} userData={userData} />;
        })}
      </div>
    </div>
  );
}

export default Feed;
