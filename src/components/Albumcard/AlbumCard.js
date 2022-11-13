import React, { useContext } from "react";
import "./AlbumCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ITunesContext } from "../../contextAPI/Context";
import Badge from "@mui/material/Badge";

const AlbumCard = ({ allData, configData, color }) => {
  const { setMyFavourites, setModaldata, setOpen } = useContext(ITunesContext);

  const modalHandler = (e, configData) => {
    console.log("configData:", configData);
    console.log("event check:", e);
    setModaldata(configData);
    setOpen(true);
  };

  return (
    <div
      className="media"
      onClick={(e) => {
        modalHandler(e, configData);
      }}
    >
      <img
        className="poster"
        src={configData?.image?.label}
        alt={configData?.title}
      />
      <Badge
        onClick={(e) => {
          console.log("fav icon clicked!", configData);
          setMyFavourites((fav) => {
            console.log("prev fav:", fav);
            if (!fav.includes(configData)) return [...fav, configData];
          });
          e.stopPropagation();
        }}
      >
        <FavoriteIcon color={color} />
      </Badge>
      <b className="title">{configData?.name}</b>
      <div className="subTitle">
        {configData?.artist?.name}
        <span className="subTitle">{configData?.price}</span>
      </div>
    </div>
  );
};

export default AlbumCard;
