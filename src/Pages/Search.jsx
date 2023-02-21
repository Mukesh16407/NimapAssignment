import { Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { SingleContent } from "../Components/SingleContent/SingleContent";
import { CustomPagination } from "../Components/Pagination/CustomPagination";
import "./Search.css";

const darkTheme = createTheme({
  palette: {
    type: "dark"
  },
  primary: {
    main: "#fff"
  }
});
export const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      setContent(data.results);

      //console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [page]);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search" style={{ marginTop: "20px" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media="movie"
            />
          ))}
      </div>

      <CustomPagination setPage={setPage} />
    </div>
  );
};
