import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from "../api/tmdb-api";

const styles = {
  imageListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
};

const MovieDetailsPage = (props) => {
  const { id } = useParams(); //useParams hook (from react-router) allows the component to extract the movie id from the browser's parameterized URL address
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie(id).then((movie) => {
      setMovie(movie);
    });
  }, [id]);

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} /> 
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p> 
      )}
    </>
  );
};

export default MovieDetailsPage;
