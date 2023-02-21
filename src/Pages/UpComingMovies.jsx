import axios from "axios";
import { React, useEffect, useState } from "react";
import { SingleContent } from "../Components/SingleContent/SingleContent";
import { CustomPagination } from "../Components/Pagination/CustomPagination";
export const UpComingMovies = () => {
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUpComingMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );

    setUpComingMovies(data.results);
  };

  useEffect(() => {
    fetchUpComingMovies();
    // eslint-disable-next-line
  }, [page]);
  return (
    <div>
      <div className="popular">
        {upComingMovies &&
          upComingMovies.map((c) => {
            return (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media={c.media_type}
                vote_average={c.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};
