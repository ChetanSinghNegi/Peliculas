import React from "react";
import ReactPlayer from "react-player/youtube";

import "../videoPopup/style.scss";

const VideoPopupCarousel = ({ show, setShow, videoId, setVideoId }) => {
  return (
    <div className={`videoPopup ${show && videoId ? "visible" : ""}`}>
      <div className="videoPlayer">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          // width="100%"
          // height="100%"

          // muted
          onError={() =>
            setVideoId(
              "https://www.youtube.com/watch?v=fRh_vgS2dFE&ab_channel=JustinBieberVEVO"
            )
          }
          playing={true}
        />
      </div>
    </div>
  );
};

export default VideoPopupCarousel;
