import React, { useContext } from "react";
import "../common.css";
import { ITunesContext } from "../../contextAPI/Context";
import AlbumCard from "../Albumcard/AlbumCard";
import ModalAlbum from "../Modal/ModalAlbum";

export const Favourites = () => {
  const { myFavourites, open, setOpen } = useContext(ITunesContext);

  return (
    <div className="common">
      <span className="pageTitle">My Favourites!</span>
      <ModalAlbum open={open} setOpen={setOpen} />
      {myFavourites?.length > 0 && (
        <div className="albumCard">
          {myFavourites?.map((c) => {
            return (
              <>
                <AlbumCard
                  alldata={myFavourites}
                  configData={c}
                  key={c.id}
                  color={myFavourites?.indexOf(c) !== -1 ? "error" : "white"}
                />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};
