import React from "react";
import { img_300, unavailable } from "../config/Config";
import "./singleContent.css";
import ContentModal from "../ContentModel/ContentModel";

export const SingleContent = ({
  id,
  poster,
  title,
  date,
  media,
  vote_average
}) => {
  return (
    <ContentModal media={media} id={id}>
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />

      <div className="content">
        <b className="title">{title}</b>
        <strong
          style={{ textAlign: "center" }}
          color={vote_average > 6 ? "primary" : "secondary"}
        >
          Rating: {vote_average}
        </strong>

        <span className="subTitle">
          {media === "tv" ? "TV Series" : "Movies"}
          <span className="subTitle">{date}</span>
        </span>
      </div>
    </ContentModal>
  );
};
