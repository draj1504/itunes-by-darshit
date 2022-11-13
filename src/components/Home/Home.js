import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../common.css";
import { ITunesContext } from "../../contextAPI/Context";
import AlbumCard from "../Albumcard/AlbumCard";
import Paginations from "../Pagination/Paginations";
import CategoryChip from "../CategoryChip/CategoryChip";
import { getNormailisedObject, containsObject } from "../../utility";
import ModalAlbum from "../Modal/ModalAlbum";

export const Home = () => {
  const {
    albumdata,
    setAlbumData,
    paginatedAlbumData,
    myFavourites,
    filteredData,
    open,
    setOpen,
  } = useContext(ITunesContext);
  useEffect(() => {
    (async function fetchData() {
      const {
        data: { feed },
      } = await axios.get(
        "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
      );
      //   console.log("fetch data:", feed);
      setAlbumData(feed.entry);
    })();
  }, [setAlbumData]);

  //   console.log("filteredAlbums check::", paginatedAlbumData, filteredData);

  const dataToBeProcessed =
    filteredData?.length > 0 ? filteredData : paginatedAlbumData;

  return (
    <div className="common">
      <span className="pageTitle">List of Albums</span>
      <CategoryChip />
      {filteredData?.length > 0 && (
        <legend className="albumLegend"> Search Results</legend>
      )}
      <ModalAlbum open={open} setOpen={setOpen} />

      {dataToBeProcessed?.length > 0 && (
        <div className="albumCard">
          {dataToBeProcessed?.map((c) => {
            const configData = getNormailisedObject(c);
            return (
              <>
                <AlbumCard
                  alldata={dataToBeProcessed}
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
      {dataToBeProcessed?.length > 0 && filteredData?.length === 0 && (
        <Paginations
          albumdata={albumdata}
          count={Math.ceil(albumdata?.length / 20) || 10}
        />
      )}
    </div>
  );
};
