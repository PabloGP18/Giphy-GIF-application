import ListOfGifs from "component/ListOfGifs/ListOfGifs";
import Spinner from "component/Spinner/index";
import useGifs from "hooks/useGifs";
import useNearScreen from "hooks/useNearScreen";
import { useEffect, useRef, useCallback } from "react";
import debounce from "just-debounce-it";
import { Helmet } from "react-helmet";
// import useSeo from "hooks/useSEO";
import SearchForm from "component/SearchForm";

const SearchResults = ({ params }) => {
  console.log(params);
  const { keyword } = params;
  const { loading, gifs, setPage } = useGifs({ keyword });
  const externalRef = useRef();
  const { show } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  });

  const title = gifs ? `${gifs.length} results of ${decodeURI(keyword)}` : "";
  // useSeo({ title });

  // const handleNextPage = () => setPage((prevPage) => prevPage + 1); this is with a button
  // const handleNextPage = () => console.log("next page");

  // debounce will make sure you only call handleNextPage once
  const debounceHandleNextPage = useCallback(
    debounce(() => setPage((prevPage) => prevPage + 1), 200),
    [setPage]
  );

  useEffect(() => {
    console.log(show);
    if (show) debounceHandleNextPage();
  }, [show, debounceHandleNextPage]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={title} />
          </Helmet>
          <SearchForm />
          <h3 className="App-title">{decodeURI(keyword)}</h3>
          <ListOfGifs gifs={gifs} />
          <div id="visor" ref={externalRef}></div>
        </>
      )}
      {/* <button onClick={handleNextPage}>Get next page</button> */}
    </>
  );
};

export default SearchResults;
