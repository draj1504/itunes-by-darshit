import React, { useEffect, useState, useContext } from "react";
import "./BottomNav.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ITunesContext } from "../../contextAPI/Context";
import WhatshotOutlined from "@mui/icons-material/Whatshot";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeMax from "@mui/icons-material/HomeSharp";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const style = {
    yellow: {
      color: "yellow",
    },
    red: {
      color: "red",
    },
    blue: {
      color: "#45b3e0",
    },
    black: {
      bgcolor: "black",
    },
  };

  const history = useNavigate();

  const { setFilteredData } = useContext(ITunesContext);

  useEffect(() => {
    console.log("value:", value);
    if (value === 0) history("/");
    else if (value === 1) history("/trending");
    else if (value === 2) history("/favourites");
  }, [history, value]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        color: "black",
        zIndex: "100",
        boxShadow: "5px 0px 0px 3px grey",
      }}
    >
      <BottomNavigation showLabels value={value} sx={style.black}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeMax sx={style.blue} />}
          onClick={() => {
            setValue(0);
            window.scroll(0, 0);
            setFilteredData([]);
          }}
        />
        <BottomNavigationAction
          label="Trending"
          sx={style.yellow}
          onClick={() => {
            setValue(1);
            window.scroll(0, 0);
            setFilteredData([]);
          }}
          icon={<WhatshotOutlined sx={style.yellow} />}
        />
        <BottomNavigationAction
          label="Favorites"
          onClick={() => {
            setValue(2);
            window.scroll(0, 0);
            setFilteredData([]);
          }}
          icon={<FavoriteIcon sx={style.red} />}
        />
      </BottomNavigation>
    </Box>
  );
}
