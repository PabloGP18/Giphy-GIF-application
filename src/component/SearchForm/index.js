import React from "react";
import useForm from "./useFormHook";
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

const SearchForm = ({
  initialKeyword = "",
  initialRating = "g",
  initialLanguage = "en",
}) => {
  // states without using useReducer
  // const [keyword, setKeyword] = useState(decodeURIComponent(initialKeyword));
  // const [times, setTimes] = useState(0);
  // const [rating, setRating] = useState(initialRating);

  const {
    keyword,
    times,
    rating,
    language,
    updateKeyword,
    updateRating,
    updateLanguage,
    updateFilter,
  } = useForm({ initialKeyword, initialRating, initialLanguage });

  const [path, pushLocation] = useLocation();

  // to check if you put any content in the searchbar
  const onSubmit = ({ keyword }) => {
    if (!keyword.trim()) {
      return;
    }
    pushLocation(`/search/${keyword}/${rating}/${language}`);

    /* this i was using, but you can still then put several whitespaces in the searchbar and it still will try to find something.
    The solution is using the trim() method to remove whitespaces
    if (keyword !== "") {
      pushLocation(`/search/${keyword}/${rating}/${language}`);
    }*/
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    onSubmit({ keyword });
    // pushLocation(`/search/${keyword}/${rating}/${language}`);
    // onSubmit({ keyword });
  };

  const handleChange = (event) => {
    // using dispatch this way if you have only one dispatch in useReducer
    // dispatch(event.target.value);
    updateKeyword(event.target.value);
  };

  const handleChangeRating = (event) => {
    updateRating(event.target.value);
  };

  const handleChangeLanguage = (event) => {
    updateLanguage(event.target.value);
  };

  const handleReset = () => {
    updateFilter();

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
