import { useEffect, useState } from "react";
import {getMovie} from '../api/tmdb-api'

//fetch movie data based on the provided ID and keep track of the movie state within the component
const useMovie = id => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    getMovie(id).then(movie => {
      setMovie(movie);
    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie
