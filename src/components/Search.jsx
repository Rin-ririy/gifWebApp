import { useEffect, useState } from "react";
import axios from "axios";

export default function Search(words, pageNumber) {
  //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [anyList, setAnyList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setAnyList([]);
  }, [words]);

  //
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const search = words;
    // const key = "hyc4fqYBLNEjtiPLEMjY7AeXA3SWNveD";
    // const key = "1EzXlc67euxMFXaQjhwBRBYGZiC8h7KK";
    const key = "eBTv17IDKyIsKozn7AaV6SEzyq0Phpq4";
    const limit = 100;
    const offset = pageNumber * 50;
    axios({
      method: "GET",
      url: `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}&offset=${offset}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const data = res.data.data;
        const imageUrlList = data.map((item) => item.images.downsized.url);
        setAnyList((prevList) => {
          return [...prevList, ...imageUrlList];
        });
        setHasMore(data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [words, pageNumber]);
  return { anyList, loading, error, hasMore };
}
