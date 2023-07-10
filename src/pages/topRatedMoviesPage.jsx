import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getTopRatedMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import MustWatchIcon from "../components/cardIcons/mustWatch";


const TopRatedMoviesPage = (props) => {
    const { data, error, isLoading, isError } = useQuery("topRated", getTopRatedMovies);

    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      return <h1>{error.message}</h1>;
    }
  
    const topRatedMovies = data ? data.results : [];

  return (
    <PageTemplate
      title='Top Rated Movies'
      movies={topRatedMovies}
      action={(movie) => {
        return <MustWatchIcon movie={movie} />
      }}
    />
  );
};

export default TopRatedMoviesPage;