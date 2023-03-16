import { useReducer } from "react";

const ACTIONS = {
  UPDATE_KEYWORD: "update_keyword",
  UPDATE_RATING: "update_rating",
  UPDATE_LANGUAGE: "update_language",
  RESET_FILTERS: "reset_filters",
};

const REDUCER = (state, action) => {
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

export default function useForm({
  initialKeyword = "",
  initialRating = "g",
  initialLanguage = "en",
} = {}) {
  const [state, dispatch] = useReducer(REDUCER, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0,
    language: initialLanguage,
  });

  const { keyword, rating, times, language } = state;

  return {
    keyword,
    rating,
    times,
    language,
    updateKeyword: (keyword) =>
      dispatch({ type: ACTIONS.UPDATE_KEYWORD, payload: keyword }),
    updateRating: (rating) =>
      dispatch({ type: ACTIONS.UPDATE_RATING, payload: rating }),
    updateLanguage: (language) =>
      dispatch({ type: ACTIONS.UPDATE_LANGUAGE, payload: language }),
    updateFilter: (reset) => dispatch({ type: ACTIONS.RESET_FILTERS }, reset),
  };
}
