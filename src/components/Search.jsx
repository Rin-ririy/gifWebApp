import React from "react";
import { useState } from "react";

const Search = (props) => {
  const [state, setState] = useState({ title: "" });
  const handleChange = (event) => {
    const title = event.target.value;
    setState({ title: title });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.search(state.title);
    setState({ title: "" });
  };
  return (
    <div className="search">
      <h2>Find your GIF!</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={state.title} onChange={handleChange} />
        <input type="button" value="Search" />
      </form>
    </div>
  );
};

export default Search;
