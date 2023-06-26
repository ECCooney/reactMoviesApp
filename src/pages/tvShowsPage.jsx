import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { getTvShows } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const TvShowsPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discover", getTvShows);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvShows = data ? data.results : [];

  return (
    <PageTemplate
      title="Discover TV Shows"
      tvShows={tvShows}
    />
  );
};
export default TvShowsPage;
