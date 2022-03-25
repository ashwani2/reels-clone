/* eslint-disable @next/next/no-img-element */
import React from "react";
import Navbar from "./Navbar";

function ProfileComp() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="profile-upper">
          <img
            src="https://media.istockphoto.com/photos/faceless-man-in-hoodie-standing-isolated-on-black-picture-id916306960?b=1&k=20&m=916306960&s=170667a&w=0&h=jVVldOMhDwhSirQNhyT3qOtJ2-Mi93UcYwIRfGzNjY0="
            alt="image-logo"
            style={{ height: "8rem", width: "8rem", borderRadius: "50%" }}
          ></img>

          <div style={{ flexBasis: "40%" }}>
            <h1>Name</h1>
            <h3>Posts:10</h3>
          </div>
        </div>
        <hr />
        <div className="profile-videos">
          <video src="https://qqcdn.mxtakatak.com/video/200021NkVJ/download/1/h264_high_540.mp4" />
          <video src="https://qqcdn.mxtakatak.com/video/200021NkVJ/download/1/h264_high_540.mp4" />
          <video src="https://qqcdn.mxtakatak.com/video/200021NkVJ/download/1/h264_high_540.mp4" />
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
