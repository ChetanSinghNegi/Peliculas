import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App() {
  // for calling any function we have to use useDispatch
  const dispatch = useDispatch();

  // //first select name of the slice that is state.name then drill to get what's needed
  // const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log("configuration values => ", res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url)); //dispatching actions
    });
  };

  //geting genres of movies and tv shows
  const genresCall = async () => {
    let promises = []; //have all promises to fetch genres list
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.map((endPoint) =>
      promises.push(fetchDataFromApi(`/genre/${endPoint}/list`))
    );
    // console.log("promises value", promises);
    const data = await Promise.all(promises); //we will get to wait till all promises will get success
    console.log("genres data =>", data);
    data.map(({ genres }) => genres.map((item) => (allGenres[item.id] = item)));
    console.log("allGenres is", allGenres);
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:mediaType/:id" element={<Details />}></Route>
        <Route path="/search/:query" element={<SearchResult />}></Route>
        <Route path="/explore/:mediaType" element={<Explore />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
