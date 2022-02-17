import React from "react";
const SearchBox = ({ onChange }) => {
  return (
    <form className="form-inline my-4  ">
      <input
        className="form-control mr-sm-2"
        type="search"
        name="query"
        // value={value}
        placeholder="Search.."
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </form>
  );
};

export default SearchBox;
