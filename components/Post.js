import { Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/auth";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

function Post({ postData, userData }) {
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const videoRef = useRef(null)


  useEffect(() => {
    if (postData.likes.includes(user.uid)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [postData]);

  //for like and unlike
  const handleLike = async () => {
    if (!like) {
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayUnion(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayRemove(user.uid),
      });
    }
  };

//for mute and unmute
  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
};

// after ending the video next video automatically scrolls
const handleScroll = (e) => {
    let next = videoRef.current.parentNode.nextSibling
    if(next){
        next.scrollIntoView({behavior:"smooth"})
        e.target.muted = true
    }
};

  return (
    <div className="post-container">
      <video src={postData.postUrl} autoPlay ref={videoRef} muted onClick={handleClick} onEnded={handleScroll}/>
      <div className="videos-info">
        <div className="avatar_container">
          <Avatar
            alt="Remy Sharp"
            src={postData.profileUrl}
            sx={{ margin: "0.5rem" }}
          />
          <p style={{ color: "white", fontWeight: "bold" }}>
            {postData.profileName}
          </p>
        </div>

        <div className="post-like">
          <FavoriteIcon
            fontSize="large"
            style={like ? { color: "red" } : { color: "white" }}
            onClick={handleLike}
          />
         <div style={{color:"red"}}> {postData.likes.length > 0 && postData.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
