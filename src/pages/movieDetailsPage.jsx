import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import ActorList from "../components/actorList";
// import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api';
import {getMovieCredits} from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

const MovieDetailsPage = () => {
  const { id } = useParams();

  const { data: movie, movieError, movieIsLoading, movieIsError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  const { data: credits, creditsError, creditsIsLoading, creditsIsError } = useQuery(
    ["credits", { id: id }],
    getMovieCredits
  );


  if (movieIsLoading || creditsIsLoading) {
    return <Spinner />;
  }

  if (movieIsError) {
    return <h1>{movieError.message}</h1>;
  }

  if (creditsIsError) {
    return <h1>{creditsError.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />   {/*the children prop of TemplateMoviePage is bound to this*/}
            <ActorList credits={credits} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p> 
      )}
    </>
  );
};

export default MovieDetailsPage;
