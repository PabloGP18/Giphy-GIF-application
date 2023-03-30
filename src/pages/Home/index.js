// import { useLocation } from "wouter";
import useGifs from "../../hooks/useGifs";
import ListOfGifs from "../../component/ListOfGifs/ListOfGifs";
import TrendingSearches from "../../component/TrendingSearches";
import "./style.css";
import SearchForm from "component/SearchForm";
// import { useCallback } from "react";
// import { useMemo } from "react";
import { Helmet } from "react-helmet";

// const POPULAR_GIFS = ["Colombia", "Venezuela", "Argentina", "Ecuador", "Spain"];

const Home = () => {
  // This logic is done now in the searchForm, because we i'm not passing any props
  // const [path, pushLocation] = useLocation();

  const { gifs, keywordToUse } = useGifs();

  console.log(keywordToUse);

  // The useCallback will save this function untill the dependancy(pushLocation) of this function changes. If this changes it will create the function again
  // This function can be use if searchForm passes the prop onSubmit with keyword information and then retreaved back here in this function to make it work
  // const handleSubmitSearchForm = useCallback(
  //   ({ keyword }) => {
  //     pushLocation(`/search/${keyword}`);
  //   },
  //   [pushLocation]
  // );

  // SearchForm rerenders all the time. You can use a useMemo hook to save the value and return it in the homepage (Not so good practice this way)
  // const element = useMemo(
  //   () => <SearchForm onSubmit={handleSubmit} />,
  //   [handleSubmit]
  // );

  return (
    <>
      <Helmet>
        <title>Home | Giphy</title>
        <meta
          name="description"
          content="A cool website where you can search for gifs!"
        />
      </Helmet>
      <div className="App-home">
        {/* {element} */}
        <SearchForm />
        <div className="App-results">
          <div className="App-listofgifs">
            {keywordToUse !== "not found" && keywordToUse !== null ? (
              <h3 className="App-title">Last Search</h3>
            ) : (
              <h3 className="App-title">random</h3>
            )}
            <ListOfGifs gifs={gifs} />
          </div>
          <div className="App-trendingSearches">
            <h3 className="App-title-trending">Trending</h3>
            <TrendingSearches />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
