import React, { createContext, useEffect, useState } from "react";
import { getNormailisedObject } from "../utility";

export const ITunesContext = createContext();

export const Context = ({ children }) => {
  const [albumdata, setAlbumData] = useState();
  const [normalisedData, seNormalisedData] = useState(albumdata);
  const [page, setPage] = useState(1);
  const [paginatedAlbumData, setPaginatedAlbumdata] = useState(albumdata);
  const [trendingData, setTrendingData] = useState([]);
  const [paginatedTrendingData, setTrendingAlbumdata] = useState(albumdata);
  const [myFavourites, setMyFavourites] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modaldata, setModaldata] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    seNormalisedData(albumdata?.map((c) => getNormailisedObject(c)));
  }, [albumdata]);

  useEffect(() => {
    const paginatedData = albumdata?.slice((page - 1) * 20, page * 20);
    setPaginatedAlbumdata(paginatedData);
    // console.log("paginatedData:", paginatedData);
  }, [albumdata, page]);

  useEffect(() => {
    const newData = albumdata?.filter((data, i) => i % 5 === 0);
    setTrendingData(newData);
  }, [albumdata]);

  useEffect(() => {
    const paginatedData = trendingData?.slice((page - 1) * 10, page * 10);
    setTrendingAlbumdata(paginatedData);
  }, [page, trendingData]);

  return (
    <ITunesContext.Provider
      value={{
        albumdata,
        setAlbumData,
        page,
        setPage,
        paginatedAlbumData,
        setPaginatedAlbumdata,
        trendingData,
        paginatedTrendingData,
        myFavourites,
        setMyFavourites,
        normalisedData,
        filteredData,
        setFilteredData,
        modaldata,
        setModaldata,
        open,
        setOpen,
      }}
    >
      {children}
    </ITunesContext.Provider>
  );
};
