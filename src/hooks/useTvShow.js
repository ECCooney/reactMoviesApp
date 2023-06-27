import { useEffect, useState } from "react";
import { getTvShow } from "../api/tmdb-api";

//fetch data based on the provided ID and keep track of the tv show state within the component
const useTvShow = (id) => {
  const [tvShow, setTvShow] = useState(null);
  useEffect(() => {
    getTvShow(id).then((tvShow) => {
      setTvShow(tvShow);
    });
  }, [id]);
  return [tvShow, setTvShow];
};

export default useTvShow;
