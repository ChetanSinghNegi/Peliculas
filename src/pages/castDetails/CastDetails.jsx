import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import Img from "../../components/lazyLoadImage/Img";
import "./style.scss";
const CastDetails = () => {
  const storeProfileUrl = useSelector((state) => state.home.url.profile);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const { person_id } = useParams();
  console.log("person_id", person_id);
  useEffect(() => {
    fetchDataFromApi(`/person/${person_id}`).then((res) => {
      setData(res);
    });
    fetchDataFromApi(`/person/${person_id}/images`).then((res) => {
      setImages(res.profiles.map((pic) => pic.file_path));
    });
    hey();
  }, []);
  console.log("person_details => ", data);
  console.log("person_images => ", images);
  const hey = () => {
    if (images.length > 0) {
      console.log(Math.ceil(Math.random() * (images?.length - 1)));
    } else {
      console.log("Length is zero");
    }
  };
  // (function () {
  //   // do some stuff
  //   setTimeout(hey, 1000);
  // })();
  const profilePath = data?.profile_path
    ? storeProfileUrl + data.profile_path
    : avatar;
  return (
    <div className="details-cover">
      <div className="background-img">
        <Img src={profilePath} />
      </div>
      <div className="opacity-layer"></div>
      <div className="details">
        <div className="profile-pic">
          <Img src={profilePath} />
          <div className="name">{data?.name}</div>
        </div>
        <div className="work">
          <div className="famous-for">{data?.known_for_department}</div>
          <div className="biography">{data?.biography}</div>
        </div>
      </div>
    </div>
  );
};

export default CastDetails;
