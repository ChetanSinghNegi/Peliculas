import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"; //this lazy loading is provided by a external library
import "react-lazy-load-image-component/src/effects/blur.css"; //this is css of lazy loading is provided by same above external library

const Img = ({ src, className }) => {
  return (
    <LazyLoadImage
      className={className || ""}
      alt=""
      effect="opacity"
      src={src}
    />
  );
};

export default Img;
