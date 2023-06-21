import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";


const UpcomingMoviesPage = (props) => {
    const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);

    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      return <h1>{error.message}</h1>;
    }
  
    const upcomingMovies = data ? data.results : [];

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={upcomingMovies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};

export default UpcomingMoviesPage;