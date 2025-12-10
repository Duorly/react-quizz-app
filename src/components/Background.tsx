import React from "react";
import backgroundVideo from "../assets/Background_animated.mp4";

const Background: React.FC = () => {
  return (
    <>
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </>
  );
};

export default Background;
