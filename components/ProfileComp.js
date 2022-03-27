/* eslint-disable @next/next/no-img-element */
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth'
import { db } from '../firebase'
import Navbar from './Navbar'

function ProfileComp() {

  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [postIds,setPostIds]=useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(user.uid);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      //unsub is just like an event
      setUserData(doc.data());
      console.log(doc.data());
      setPostIds(doc.data().posts);
    });

    return () => {
      unsub(); //after perfoming the task removing the event
    };
  }, [user]);

  useEffect(()=>{
    let tempArray=[];
    postIds.map(async (postId,index)=>{
      const unsub=onSnapshot(doc(db,"posts",postId),(doc)=>{
        tempArray.push(doc.data());
        console.log(tempArray);
        setPosts([...tempArray])
      })
    })
  },[postIds]);

  return (
    <div>
      <Navbar userData={userData} />
      <div>
        <div className="profile-upper">
          <img
            src={userData.photoURL}  
            alt="image-logo"
            style={{ height: "8rem", width: "8rem", borderRadius: "50%" }}
          ></img>

          <div style={{ flexBasis: "40%" }}>
            <h1>{userData.name}</h1>
            <h3>Posts:{userData?.posts?.length}</h3>
          </div>
        </div>
        <hr />
        <div className="profile-videos">
          {
            posts.map((post,index)=>{
              return <video src={post.postUrl} key={index}/>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
