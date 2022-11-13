import React, { useContext } from "react";
import { Modal } from "@mui/material";
import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { Box } from "@mui/material";
import { ITunesContext } from "../../contextAPI/Context";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import "./ModalAlbumm.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "black",
  color: "white",
  border: "0px 1px 5px white",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const typoStyle = {
  marginBottom: "15px",
};

export default function ModalAlbum({ open, setOpen }) {
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { modaldata } = useContext(ITunesContext);

  return (
    modaldata?.name && (
      <div className="modal-container">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="modal-wrapper">
            <Badge
              onClick={() => {
                console.log("close icon clicked!");
                setOpen(false);
              }}
              className="modal-close-btn"
              style={{ marginLeft: "10%", cursor: "pointer" }}
            >
              <HighlightOffRoundedIcon color="white" />
            </Badge>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={typoStyle}
            >
              {modaldata?.title}
            </Typography>
            <img
              src={modaldata?.image?.label}
              alt={modaldata?.name}
              style={{ border: "5px white", boxShadow: "0px 1px 5px white" }}
            />
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, ...typoStyle }}
            >
              <a
                href={modaldata?.links?.href}
                target="_blank"
                rel="noreferrer"
                style={{ color: "red", fontWeight: "bold" }}
              >
                {modaldata?.name}
              </a>
            </Typography>
            <Typography id="modal-album-price" sx={{ mt: 2, ...typoStyle }}>
              {modaldata?.price}
            </Typography>
            <Typography id="modal-album-artist" sx={{ mt: 2, ...typoStyle }}>
              {modaldata?.artist?.name}
            </Typography>
            <Typography id="modal-album-relDate" sx={{ mt: 2, ...typoStyle }}>
              {modaldata?.releaseDate?.date}
            </Typography>
            <Typography
              id="modal-album-rights"
              sx={{ mt: 2, ...typoStyle, justifyContent: "center" }}
            >
              {modaldata?.rights}
            </Typography>
          </Box>
        </Modal>
      </div>
    )
  );
}
