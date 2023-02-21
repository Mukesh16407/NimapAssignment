import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/system";
import { Home } from "./Pages/Home";
import { TopRated } from "./Pages/TopRated";
import { UpComingMovies } from "./Pages/UpComingMovies";
import { Search } from "./Pages/Search";
import { Header } from "./Components/Header";
import "./styles.css";
export default function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topRated" element={<TopRated />} />
            <Route path="/upcoming" element={<UpComingMovies />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
    </>
  );
}
