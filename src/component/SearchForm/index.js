import React, { useState } from "react";

const SearchForm = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState("");

  const handelSubmit = (event) => {
    event.preventDefault();

    onSubmit({ keyword });
  };

  const handleInput = (event) => {
    setKeyword(event.target.value);
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
    </form>
  );
};

// By wrapping this component in React.memo, this component will not rerender if the old props and the new ones havent changed (beter practice than useMemo)
export default React.memo(SearchForm);
