import { useLocation } from "wouter";
import useGifs from "../../hooks/useGifs";
import ListOfGifs from "../../component/ListOfGifs/ListOfGifs";
import TrendingSearches from "../../component/TrendingSearches";
import "./style.css";
import SearchForm from "component/SearchForm";
import { useCallback } from "react";
// import { useMemo } from "react";
import { Helmet } from "react-helmet";

// const POPULAR_GIFS = ["Colombia", "Venezuela", "Argentina", "Ecuador", "Spain"];

const Home = () => {
  const [path, pushLocation] = useLocation();

  const { gifs } = useGifs();

  // The useCallback will save this function untill the dependancy(pushLocation) of this function changes. If this changes it will create the function again
  const handleSubmit = useCallback(
    ({ keyword }) => {
      pushLocation(`/search/${keyword}`);
    },
    [pushLocation]
  );

  // SearchForm rerenders all the time. You can use a useMemo hook to save the value and return it in the homepage (Not so good practice this way)
  // const element = useMemo(
  //   () => <SearchForm onSubmit={handleSubmit} />,
  //   [handleSubmit]
  // );

  return (
    <>
      <Helmet>
        <title>Home | Giffy</title>
        <meta
          name="description"
          content="A cool website where you can search for gifs!"
        />
      </Helmet>
      <div className="App-home">
        {/* {element} */}
        <SearchForm onSubmit={handleSubmit} />
        <div className="App-results">
          <h3 className="App-title">Last Search</h3>
          <ListOfGifs gifs={gifs} />
        </div>
        <TrendingSearches />
      </div>
    </>
  );
};

export default Home;
