import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";

const MovieDetailsPage = (props) => {
  const { id } = useParams(); //useParams hook (from react-router) allows the component to extract the movie id from the browser's parameterized URL address
  const [movie] = useMovie(id); //custom hook

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />   {/*the children prop of TemplateMoviePage is bound to this*/}
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p> 
      )}
    </>
  );
};

export default MovieDetailsPage;
