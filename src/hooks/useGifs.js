import { useContext, useState, useEffect } from "react";
import getGifs from "../services/getGifs";
import GifsContext from "../context/GifsContext";

const INITIAL_PAGE = 0;

const useGifs = ({ keyword } = { keyword: null }) => {
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const { gifs, setGifs } = useContext(GifsContext);

  // if you have a keyword? Get it from the localStoragestorage, if you don't look for nothing it will search for random
  const keywordToUse =
    keyword || localStorage.getItem("lastKeyword") || "random";
  console.log(keywordToUse);

  useEffect(() => {
    setLoading(true);

    getGifs({ keyword: keywordToUse }).then((images) => {
      setGifs(images);
      setLoading(false);
      localStorage.setItem("lastKeyword", keyword);
    });
    // storing the keyword in localStorage
  }, [keyword, keywordToUse, setGifs]);

  // useEffect for when you change the page, extra gifs wil load
  useEffect(() => {
    if (page === INITIAL_PAGE) return;

    setLoadingNextPage(true);

    getGifs({ keyword: keywordToUse, page }).then((nextGifs) => {
      setGifs((prevGifs) => prevGifs.concat(nextGifs));
      setLoadingNextPage(false);
    });
  }, [page, keywordToUse, setGifs]);

  return { loading, gifs, setPage, loadingNextPage };
};

export default useGifs;
