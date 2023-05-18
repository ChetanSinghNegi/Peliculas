import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi"; //search Icon
import { SlMenu } from "react-icons/sl"; //hamburger icon
import { VscChromeClose } from "react-icons/vsc"; // close icon
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
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
    }
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem">Movies</li>
          <li className="menuItem">TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
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
