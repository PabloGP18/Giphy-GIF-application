import React, { useState } from "react";
import { useLocation } from "wouter";

const RATINGS = ["g", "pg", "pg-13", "r"];

const SearchForm = ({ initialKeyword = "", initialRating = "g" }) => {
  const [keyword, setKeyword] = useState(decodeURIComponent(initialKeyword));
  const [path, pushLocation] = useLocation();
  const [rating, setRating] = useState(initialRating);

  const handelSubmit = (event) => {
    event.preventDefault();
    pushLocation(`/search/${keyword}/${rating}`);
    // onSubmit({ keyword });
  };

  const handleInput = (event) => {
    setKeyword(event.target.value);
  };

  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };

  return (
    <form onSubmit={handelSubmit}>
      <input
        onChange={handleInput}
        type="text"
        value={keyword}
        placeholder="Search a gif here..."
      />
      <button>Search</button>
      <select onChange={handleChangeRating} value={rating}>
        <option disabled>Rating type</option>
        {RATINGS.map((rating) => (
          <option key={rating}>{rating}</option>
        ))}
      </select>
    </form>
  );
};

// By wrapping this component in React.memo, this component will not rerender if the old props and the new ones havent changed (beter practice than useMemo)
export default React.memo(SearchForm);
