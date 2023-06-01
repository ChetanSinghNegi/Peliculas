import React from "react";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const CastItem = ({ item }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const navigation = (event) => {
    navigate(`/person/${item.id}`);
  };
  console.log("item inside CastItem", item);
  let imgUrl = item?.profile_path ? url.profile + item.profile_path : avatar;
  return (
    <div key={item.id} className="listItem" onClick={navigation}>
      <div className="profileImg">
        <Img src={imgUrl} />
      </div>
      <div className="name">{item?.name}</div>
      <div className="character">{item?.character}</div>
    </div>
  );
};

export default CastItem;
