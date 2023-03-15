import React, { useReducer, useState } from "react";
import { useLocation } from "wouter";

const RATINGS = ["g", "pg", "pg-13", "r"];

const ACTIONS = {
  UPDATE_KEYWORD: "update_keyword",
  UPDATE_RATING: "update_rating",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
        times: state.times + 1,
      };
    case ACTIONS.UPDATE_RATING:
      return {
        ...state,
        rating: action.payload,
        times: state.times + 1,
      };

    default:
      return state;
  }

  /*With if & if else
  // if (action.type === ACTIONS.UPDATE_KEYWORD) {
  //   return {
  //     ...state,
  //     keyword: action.payload,
  //     times: state.times + 1,
  //   };
  // } else if (action.type === ACTIONS.UPDATE_RATING) {
  //   return {
  //     ...state,
  //     rating: action.payload,
  //     times: state.times + 1,
  //   };
*/
};

const SearchForm = ({ initialKeyword = "", initialRating = "g" }) => {
  // states without using useReducer
  // const [keyword, setKeyword] = useState(decodeURIComponent(initialKeyword));
  // const [times, setTimes] = useState(0);
  // const [rating, setRating] = useState(initialRating);

  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0,
  });

  const { keyword, times, rating } = state;

  const [path, pushLocation] = useLocation();

  const handelSubmit = (event) => {
    event.preventDefault();
    pushLocation(`/search/${keyword}/${rating}`);
    // onSubmit({ keyword });
  };

  const handleChange = (event) => {
    // using dispatch this way if you have only one dispatch in useReducer
    // dispatch(event.target.value);

    dispatch({ type: ACTIONS.UPDATE_KEYWORD, payload: event.target.value });
  };

  const handleChangeRating = (event) => {
    dispatch({ type: ACTIONS.UPDATE_RATING, payload: event.target.value });
  };

  // change handlers without using useReducer
  // const handleChange = (event) => {
  //   setKeyword(event.target.value)
  // }

  // const handleChangeRating = (event) => {
  //   setRating(event.target.value);
  // };

  return (
    <form onSubmit={handelSubmit}>
      <input
        onChange={handleChange}
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
      <small>{times}</small>
    </form>
  );
};

// By wrapping this component in React.memo, this component will not rerender if the old props and the new ones havent changed (beter practice than useMemo)
export default React.memo(SearchForm);
