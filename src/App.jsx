import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Search from "./components/Search";

const App = () => {
  //
  const [gifUrlList, setGifUrlList] = useState([]);

  //
  const gipyhApi = async (target) => {
    //
    const search = target;
    const key = "hyc4fqYBLNEjtiPLEMjY7AeXA3SWNveD";
    // const key = "1EzXlc67euxMFXaQjhwBRBYGZiC8h7KK";
    const limit = 100;
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    //
    await axios.get(url).then((res) => {
      const data = res.data.data;
      const imageUrlList = data.map((item) => item.images.downsized.url);
      setGifUrlList({ gifUrlList: imageUrlList });
    });
  };

  //
  // useEffect(() => {
  //   gipyhApi();
  // }, []);

  // console.log(gifUrlList);

  // マウント　時,依存配列の中身が変わった

  //
  const renderImageList = (list) => {
    // console.log(list);
    return (
      <ul className="list">
        {list.gifUrlList.map((url) => {
          return (
            <li className="item">
              <img src={url} alt="" className="image" />
            </li>
          );
        })}
      </ul>
    );
  };

  if (gifUrlList.length === 0) {
    return (
      <div>
        <Search search={gipyhApi} />
      </div>
    );
  }
  // console.log(gifUrlList);
  return (
    <div>
      <Search search={gipyhApi} />
      {renderImageList(gifUrlList)}
    </div>
  );
};

export default App;
