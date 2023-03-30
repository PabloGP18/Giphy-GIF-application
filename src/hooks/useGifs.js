import { useContext, useState, useEffect } from "react";
import getGifs from "../services/getGifs";
import GifsContext from "../context/GifsContext";

const INITIAL_PAGE = 0;

const useGifs = (
  { keyword, rating, language, limit } = { keyword: null, limit: 14 }
) => {
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const { gifs, setGifs } = useContext(GifsContext);

  // if you have a keyword? Get it from the localStoragestorage, if you don't look for nothing it will search for random
  const defaultKeyword = "not found";
  const keywordToUse =
    keyword || localStorage.getItem("lastKeyword") || defaultKeyword;
  console.log(keywordToUse);

  useEffect(() => {
    setLoading(true);

    getGifs({ keyword: keywordToUse, rating, language, limit }).then(
      (images) => {
        if (images.length === 0) {
          // if no images were found, try again with the default keyword
          getGifs({ keyword: defaultKeyword, rating, language, limit }).then(
            (defaultImages) => {
              setGifs(defaultImages);
              setLoading(false);
              localStorage.setItem("lastKeyword", defaultKeyword);
            }
          );
        } else {
          setGifs(images);
          setLoading(false);
          localStorage.setItem("lastKeyword", keywordToUse);
        }
      }
    );
    // storing the keyword in localStorage
  }, [keyword, keywordToUse, rating, setGifs, language, limit]);

  // useEffect for when you change the page, extra gifs wil load
  useEffect(() => {
    if (page === INITIAL_PAGE) return;

    setLoadingNextPage(true);

    getGifs({ keyword: keywordToUse, page, rating, limit }).then((nextGifs) => {
      setGifs((prevGifs) => prevGifs.concat(nextGifs));
      setLoadingNextPage(false);
    });
  }, [page, keywordToUse, setGifs, language, rating, limit]);

  return {
    loading,
    gifs,
    setPage,
    loadingNextPage,
    rating,
    language,
    keywordToUse,
  };
};

export default useGifs;
