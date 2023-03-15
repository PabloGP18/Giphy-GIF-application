import React, { useReducer, useState } from "react";
import { useLocation } from "wouter";

const RATINGS = ["g", "pg", "pg-13", "r"];

const LANGUAGES = [
  "ar",
  "bn",
  "bg",
  "zh-CN",
  "zh-TW",
  "cs",
  "da",
  "nl",
  "en",
  "fa",
  "fi",
  "fr",
  "de",
  "el",
  "gu",
  "he",
  "hi",
  "hu",
  "id",
  "it",
  "ja",
  "kn",
  "ko",
  "ms",
  "ml",
  "mr",
  "nb",
  "pl",
  "pt",
  "pa",
  "ro",
  "ru",
  "sr",
  "si",
  "sk",
  "sl",
  "es",
  "sv",
  "ta",
  "te",
  "th",
  "tr",
  "uk",
  "ur",
  "vi",
];

const ACTIONS = {
  UPDATE_KEYWORD: "update_keyword",
  UPDATE_RATING: "update_rating",
  UPDATE_LANGUAGE: "update_language",
  RESET_FILTERS: "reset_filters",
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
    case ACTIONS.UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        times: state.times + 1,
      };
    case ACTIONS.RESET_FILTERS:
      return {
        keyword: "",
        rating: "g",
        language: "en",
        times: 0,
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

const SearchForm = ({
  initialKeyword = "",
  initialRating = "g",
  initialLanguage = "en",
}) => {
  // states without using useReducer
  // const [keyword, setKeyword] = useState(decodeURIComponent(initialKeyword));
  // const [times, setTimes] = useState(0);
  // const [rating, setRating] = useState(initialRating);

  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0,
    language: initialLanguage,
  });

  const { keyword, times, rating, language } = state;

  const [path, pushLocation] = useLocation();

  const handelSubmit = (event) => {
    event.preventDefault();
    pushLocation(`/search/${keyword}/${rating}/${language}`);
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

  const handleChangeLanguage = (event) => {
    dispatch({ type: ACTIONS.UPDATE_LANGUAGE, payload: event.target.value });
  };

  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
    // This way you can use it without a putting the reset action in the switch
    // dispatch({ type: ACTIONS.UPDATE_KEYWORD, payload: initialKeyword });
    // dispatch({ type: ACTIONS.UPDATE_RATING, payload: initialRating });
    // dispatch({ type: ACTIONS.UPDATE_LANGUAGE, payload: initialLanguage });
  };

  // change handlers without using useReducer
  // const handleChange = (event) => {
  //   setKeyword(event.target.value)
  // }

  // const handleChangeRating = (event) => {
  //   setRating(event.target.value);
  // };

  return (
    <>
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
        <select onChange={handleChangeLanguage} value={language}>
          <option disabled>Select language</option>
          {LANGUAGES.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
        <small>{times}</small>
      </form>
      <button type="button" onClick={handleReset}>
        Reset Filters
      </button>
    </>
  );
};

// By wrapping this component in React.memo, this component will not rerender if the old props and the new ones havent changed (beter practice than useMemo)
export default React.memo(SearchForm);
