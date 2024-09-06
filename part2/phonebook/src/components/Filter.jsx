import React from "react";

const Filter = ({ search, setSearch }) => {
  return (
    <div>
      filter shown with:
      <input onChange={(e) => setSearch(e.target.value)} value={search} />
    </div>
  );
};

export default Filter;
