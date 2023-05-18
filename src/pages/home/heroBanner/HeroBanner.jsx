import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";

function HeroBanner() {
  const navigate = useNavigate();
  const [background, setBackground] = useState(""); //for background image
  const [query, setQuery] = useState(""); // for input search in explore
  const { url } = useSelector((state) => state.home); //getting url from redux store

  const { data, loading } = useFetch("/movie/upcoming");
  console.log("data is", data);

  useEffect(() => {
    console.log("url value is => ", url);
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    //if someone presses enter in herobanner search input text
    if (event.key == "Enter" && query.length > 0) {
      console.log("Searching for", query);
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      {!loading && <Img src={background} className="backdrop-img"></Img>}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subtitles">
            Millions of Movies, TV Shows and People to discover. Explore Now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;
