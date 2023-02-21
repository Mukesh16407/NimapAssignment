import * as React from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import "./contentModel.css";
import { img_500, unavailable, unavailableLandscape } from "../config/Config";
import "./contentModel.css";
import { Gallery } from "../carosuel/carosuel";

const Modal1 = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const Icons = styled("div")((theme) => ({
  width: "90%",
  height: "80%",
  backgroundColor: "#6e82a4",
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: 5,
  spacing: [1, 1, 3]
}));

export default function ContentModal({ children, media, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchModalData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    //console.log(data);
  };

  useEffect(() => {
    fetchModalData();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div onClick={handleOpen} className="media">
        {children}
      </div>
      <Modal1
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          {content && (
            <Icons className="ContentModal">
              <img
                src={
                  content.poster_path
                    ? `${img_500}/${content.poster_path}`
                    : unavailable
                }
                alt={content.name || content.title}
                className="ContentModal__portrait"
              />
              <img
                src={
                  content.backdrop_path
                    ? `${img_500}/${content.backdrop_path}`
                    : unavailableLandscape
                }
                alt={content.name || content.title}
                className="ContentModal__landscape"
              />
              <div className="ContentModal__about">
                <span className="ContentModal__title">
                  {content.name || content.title} (
                  {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                  ).substring(0, 4)}
                  )
                </span>
                {content.tagline && (
                  <i className="tagline">{content.tagline}</i>
                )}
                <span className="ContentModal__description">
                  {content.overview}
                </span>
                <div>
                  <Gallery id={id} media={media} />
                </div>
              </div>
            </Icons>
          )}
        </Fade>
      </Modal1>
    </div>
  );
}
