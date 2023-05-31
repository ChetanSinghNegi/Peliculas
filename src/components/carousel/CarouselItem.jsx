import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; //for converting date format
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import { fetchDataFromApi } from "../../utils/api";
import useFetch from "../../hooks/useFetch";
import VideoPopupCarousel from "./VideoPopupCarousel";
const CarouselItem = ({ item, endpoint }) => {
  const [show, setShow] = useState(false); //for showing video
  const [videoId, setVideoId] = useState(null); // for showing video we need id
  const { data: videoData, loading } = useFetch(
    `/${item?.media_type || endpoint}/${item?.id}/videos`
  );

  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  console.log("item => ", item);
  const posterUrl = item?.poster_path
    ? url.poster + item?.poster_path
    : PosterFallback;

  const posterHover = (e) => {
    if (e.type === "mouseenter") {
      setShow(true);
      setVideoId(videoData?.results?.[0]?.key || null);
    } else {
      setShow(false);
      setVideoId(null);
    }
  };
  return (
    <>
      <div
        className={`carouselItem`}
        onClick={() => navigate(`/${item?.media_type || endpoint}/${item?.id}`)}
      >
        <div
          className={`posterBlock`}
          onMouseEnter={posterHover}
          onMouseLeave={posterHover}
        >
          <Img src={posterUrl} className={`${show ? "hovering-effect" : ""}`} />
          {show && (
            <VideoPopupCarousel
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          )}
          <CircleRating rating={item?.vote_average.toFixed(1)} />
          <Genres data={item?.genre_ids.slice(0, 2)} />
        </div>
        <div className="textBlock">
          <span className="title">{item?.title || item?.name}</span>
          <span className="date">
            {dayjs(item?.release_date).format("MMM D, YYYY")}
          </span>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default CarouselItem;
