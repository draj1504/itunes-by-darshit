import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/BottomNav/BottomNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/system";
import { Home } from "./components/Home/Home";
import { Trending } from "./components/Trending/Trending";
import { Favourites } from "./components/Favourites/Favourites";
import { Context } from "./contextAPI/Context";

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Header />
        <Container className="conatiner">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/trending" element={<Trending />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </Container>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </Context>
  );
}

export default App;
