import React, { useRef, useState } from "react";
import Image from "next/image";

const Index = () => {
  // Video Play Pause State
  const ConfigVideo = useRef();
  const [playVideo, setPlayVideo] = useState(false);

  // Mouse Enter Leave State
  const [mouse, setMouse] = useState(true);

  // Mouse Enter Leave function
  function MouseEnter() {
    if (!mouse) {
      setMouse(true);
    }
  }
  function MouseLeave() {
    if (mouse === true) {
      setMouse(false);
    }
  }

  // Video Play Pause function
  function playVid() {
    ConfigVideo.current.play();
  }

  function pauseVid() {
    ConfigVideo.current.pause();
  }

  return (
    <div className="main_reel_section">
      <div className="main_reel_container" onMouseEnter={MouseEnter}>
        <video className="video" ref={ConfigVideo} loop autoPlay muted>
          <source src="/images/Soap Bubble.mp4" type="video/mp4" />
          {/* {<source src="/images/video.mp4" type="video/mp4" />} */}
        </video>
        {mouse && (
          <div className="play_pause_box" onMouseLeave={MouseLeave}>
            <div>
              {(playVideo === false && (
                <Image
                  src="/images/pause.png"
                  //   onMouseEnter={MouseEnter}
                  width={50}
                  height={50}
                  objectFit="cover"
                  alt="play logo"
                  onClick={() => {
                    pauseVid();
                    setPlayVideo(true);
                  }}
                />
              )) || (
                <Image
                  src="/images/play.png"
                  //   onMouseLeave={MouseLeave}
                  width={50}
                  height={50}
                  objectFit="cover"
                  alt="play logo"
                  onClick={() => {
                    playVid();
                    setPlayVideo(false);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
