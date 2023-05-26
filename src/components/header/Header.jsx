import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi"; //search Icon
import { SlMenu } from "react-icons/sl"; //hamburger icon
import { VscChromeClose } from "react-icons/vsc"; // close icon
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";
import pig from "../../assets/pig.png";
import peliculas from "../../assets/peliculas.png";
import ContentWrapper from "../contentWrapper/ContentWrapper";
const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false); //MDisplay drop down when hamburger clicked
  const [query, setQuery] = useState(""); //saving query of header search
  const [showSearch, setShowSearch] = useState(""); //in header if clicked search
  const navigate = useNavigate();
  const location = useLocation();

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const searchQueryHandler = (event) => {
    //if someone presses enter in input text
    if (event.key == "Enter" && query.length > 0) {
      console.log("Searching for", query);
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
      setQuery("");
    }
  };

  const navigationHandler = (type) => {
    //after clicking movies or tv series
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  useEffect(() => {
    /* when goes to next page so changing cursor position to default*/
    window.scrollTo(0, 0);
  }, [location]);

  //hiding topbar after scrolling towards y axis
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  //logic for hiding navbar when y scolling
  const controlNavbar = () => {
    if (window.scrollY > 250) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={pig} alt="" />
          <img src={peliculas} alt="" />
        </div>

        {/* this will run only for Desktop check css if needed */}
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />

          {/* this will run only for Mobile*/}
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {/* for the search bar in headers */}
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onChange={(event) => setQuery(event.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
