import React, { useContext, useEffect, useState } from "react";
import { Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import { getNormailisedObject } from "../../utility";
import { ITunesContext } from "../../contextAPI/Context";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./CategoryChip.css";

const CategoryChip = () => {
  const { albumdata, normalisedData, setFilteredData } =
    useContext(ITunesContext);
  const [chipsArr, setChipsArr] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  // const [date, setDate] = React.useState(null);

  useEffect(() => {
    // console.log("selectedChips:", selectedChips);
    if (selectedChips?.length > 0) {
      const filteredAlbums = [];
      albumdata?.forEach((a) => {
        const category = a?.category?.attributes?.label;
        if (selectedChips?.includes(category)) {
          //   console.log("category:", getNormailisedObject(a));
          filteredAlbums?.push(a);
        }
      });
      //   console.log("filteredAlbums:", filteredAlbums);
      setFilteredData(filteredAlbums);
    }
  }, [albumdata, selectedChips, setFilteredData]);

  useEffect(() => {
    // console.log("normalisedData:", normalisedData);
    const chips = [];
    normalisedData?.forEach((element) => {
      if (!chips.includes(element.category)) chips.push(element.category);
    });
    // console.log("chips:", chips);
    setChipsArr(chips);
  }, [normalisedData]);

  const searchHandler = (value) => {
    // console.log("albumdata", albumdata);
    console.log("searching:", value);
    const mySearchText = value?.trim().toLowerCase();
    const filteredAlbums = [];
    albumdata?.forEach((a) => {
      const title = a?.title?.label.toLowerCase();
      // console.log("title being searched:", title,mySearchText);
      if (title.includes(mySearchText)) {
        console.log("search data found:", a);
        filteredAlbums.push(a);
      }
    });
    setSelectedChips([]);
    setFilteredData(filteredAlbums);
  };

  const debounce = (func) => {
    let timer;
    return function (value) {
      // const context = this;
      console.log("debouned:", value);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(value);
      }, 1000);
    };
  };

  const optimizedFn = debounce(searchHandler);

  const handleDateChange = (inputdate) => {
    console.log("date:", inputdate);
    const filteredAlbums = [];
    albumdata?.forEach((a) => {
      console.log("a is:", a);
      let relDate = a["im:releaseDate"]?.label;
      relDate = relDate.slice(0, relDate.indexOf("T"));
      console.log("relDate:", relDate);
      if (relDate === inputdate) {
        console.log("release date found:", a);
        filteredAlbums.push(a);
      }
    });
    setSelectedChips([]);
    setFilteredData(filteredAlbums);
  };

  return (
    <div className="filterFnDiv">
      <div className="category-holder">
        {chipsArr.length > 0 &&
          chipsArr.map((c, i) => {
            const isPresent = selectedChips?.indexOf(c) !== -1;
            isPresent && console.log(isPresent, c);

            return (
              <Chip
                className="indvChip"
                label={c}
                style={{ margin: 2 }}
                size="small"
                key={`${c}-${i}`}
                clickable
                onClick={() => {
                  if (selectedChips.indexOf(c) === -1) {
                    console.log("Clicked!!", c);
                    setSelectedChips((existingChips) => {
                      return [...existingChips, c];
                    });
                  } else {
                    console.log("deleted!!", c);
                    setSelectedChips(
                      selectedChips?.filter(
                        (existingChips) => existingChips !== c
                      )
                    );
                  }
                }}
                sx={{
                  color: selectedChips.indexOf(c) === -1 ? "black" : "red",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  ":hover": {
                    color: selectedChips.indexOf(c) === -1 ? "white" : "red",
                    backgroundColor: "black",
                  },
                }}
              />
            );
          })}
        {selectedChips?.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            className="clear-filter-btn"
            onClick={() => {
              setFilteredData([]);
              setSelectedChips([]);
            }}
            sx={{
              marginTop: "10px",
              height: "25px",
              fontWeight: "bolder",
              minWidth: "120px",
            }}
          >
            Clear Filter
          </Button>
        )}
      </div>

      <div className="functionality-holder category-holder">
        <div className="search-calender-box">
          <div className="calenderWrapper">
            <label for="birthday">Release Date: </label>
            <input
              type="date"
              id="relase-date-filter"
              name="Release Date"
              className="calender-box"
              onChange={(e) => {
                handleDateChange(e.target.value);
              }}
            />
          </div>
          <div className="search-bar-wrapper">
            <TextField
              id="standard-basic"
              hiddenLabel
              className="searchBar"
              defaultValue="Search here"
              size="small"
              onClick={(e) => {
                if (e.target.value === "Search here") e.target.value = "";
              }}
              onChange={(e) => {
                optimizedFn(e.target.value);
              }}
              sx={{
                color: "black",
                backgroundColor: "white",
                borderRadius: "20px",
                height: "25px",
                maxWidth: "300px",
                width: "100%",
                fontWeight: "bold",
              }}
            />
            <SearchIcon
              className="searchIcon"
              sx={{
                height: "25px",
                cursor: "pointer",
              }}
              onClick={() => searchHandler()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryChip;
