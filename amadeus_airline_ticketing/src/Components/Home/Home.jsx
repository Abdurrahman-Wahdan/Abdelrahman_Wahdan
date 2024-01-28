import React from "react";

// images and vids
import video from "../../assets/video.mp4";

// import image from "../../assets/video.mp4";
const Home = () => {
  return (
    <div className="home flex container">
      <div className="mainText">
        <h1>Where All Your Destinations Become Closer Than You Think</h1>
      </div>

      <div className="homeImages flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop className="video"></video>
        </div>

        {/* <img src="" className="plane" /> */}
      </div>
    </div>
  );
};

export default Home;
