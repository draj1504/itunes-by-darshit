import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import { ITunesContext } from "../../contextAPI/Context";
import Stack from "@mui/material/Stack";
import "./Paginations.css";

const Paginations = ({ albumdata, count = 10 }) => {
  const { page, setPage } = useContext(ITunesContext);

  return (
    <div className="pagination-container">
      <Stack spacing={2} className="arrowBtns">
        <Pagination
          count={count}
          defaultPage={1}
          onChange={(e) => {
            console.log("page changed to:", e.target.textContent || page);
            window.scroll(0, 0);
            // const arrowBtn = e.target.dataset.testid;
            // if (arrowBtn === "NavigateNextIcon") {
            //   console.log("page:", arrowBtn);
            //   setPage((page) => {
            //     if (page < count) return page + 1;
            //   });
            // } else if (arrowBtn === "NavigateBeforeIcon") {
            //   console.log("page: arrowBtn", arrowBtn);
            //   setPage((page) => {
            //     if (page > 1) return page - 1;
            //   });
            // }

            e.target.textContent && setPage(e.target.textContent);
          }}
        />
      </Stack>
    </div>
  );
};

export default Paginations;
