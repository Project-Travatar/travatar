import React, { useRef, useEffect } from 'react';
import video from "../assets/loader.mp4";

const Loader = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the playback rate to 0.5 (half speed)
    }
  }, []);

  return (
    <div>
      <h2 className='text-center text-[#95a3c1] text-4xl'>LOADING</h2>
      <video
        src={video}
        autoPlay={true}
        loop={true}
        muted={true}
        height="500px"
        width="700px"
        ref={videoRef}
      />
    </div>
  );
};

export default Loader;