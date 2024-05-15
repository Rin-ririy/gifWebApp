import "./App.css";
import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import Search from "./components/Search";

const App = () => {
  const [words, setWords] = useState("");
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { anyList, loading, error, hasMore } = Search(words, pageNumber);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // 追記
  const getText = () => {};
  // ここまで

  const handleSubmit = (e) => {
    getText();
    setWords(query);
    setPageNumber(1);
    setQuery("");
  };

  return (
    <>
      <div className="search">
        <h2>Find your GIF!</h2>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Search
        </button>
      </div>
      <ul className="list">
        {anyList.map((url, i) => {
          if (anyList.length === i + 1) {
            return (
              <li ref={lastElementRef} className="item" key={i}>
                <img src={url} alt="" className="image" />
              </li>
            );
          } else {
            return (
              <li className="item" key={i}>
                <img src={url} alt="" className="image" />
              </li>
            );
          }
        })}
      </ul>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
};

export default App;
