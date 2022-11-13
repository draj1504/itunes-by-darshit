import React, { useContext } from "react";
import "../common.css";
import AlbumCard from "../Albumcard/AlbumCard";
import { ITunesContext } from "../../contextAPI/Context";
import { getNormailisedObject, containsObject } from "../../utility";
import Paginations from "../Pagination/Paginations";
import ModalAlbum from "../Modal/ModalAlbum";

export const Trending = () => {
  const { trendingData, paginatedTrendingData, myFavourites, open, setOpen } =
    useContext(ITunesContext);

  return (
    <div className="common">
      <span className="pageTitle">Trending Albums</span>
      <ModalAlbum open={open} setOpen={setOpen} />
      {paginatedTrendingData?.length > 0 && (
        <div className="albumCard">
          {paginatedTrendingData?.map((c) => {
            const configData = getNormailisedObject(c);
            return (
              <>
                <AlbumCard
                  alldata={paginatedTrendingData}
                  configData={configData}
                  key={configData.id}
                  color={
                    containsObject(configData, myFavourites) ? "error" : "white"
                  }
                />
              </>
            );
          })}
        </div>
      )}
      {paginatedTrendingData?.length > 0 && (
        <Paginations
          albumdata={paginatedTrendingData}
          count={Math.ceil(trendingData?.length / 10) || 10}
        />
      )}
    </div>
  );
};
