import React from "react";
import Navbar from "./Navbar";
import Upload from "./Upload";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from '@mui/icons-material/Favorite';
function Feed() {
  return (
    <div className="feed-container">
      <Navbar />
      <Upload />
      <div className="videos-container">
        <div className="post-container">
          <video src="https://qqcdn.mxtakatak.com/video/200022AsYT/download/1/h264_high_576.mp4"/>
          <div className="videos-info">
            <div className="avatar-container"> <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                  sx={{ margin: "0.5rem" }}
                /> <p> NAME </p></div>
            <div className="post-like">
              <FavoriteIcon fontSize="large"/> 10
            </div>
          </div>
        </div>
        <div className="post-container">
          <video/>

        </div>
      </div>
    </div>
  );
}

export default Feed;
