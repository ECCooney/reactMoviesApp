import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { getTvShows } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Pagination from '@mui/material/Pagination';

const TvShowsPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    console.log(value)
  };

    const {  data, error, isLoading, isError }  = useQuery(['discover', currentPage], () => getTvShows(currentPage), { keepPreviousData: true })

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvShows = data ? data.results : [];

  return (
    <>
    <PageTemplate
      title="Discover TV Shows"
      tvShows={tvShows}
    />
    <Pagination
        count='100'
        variant='outlined'
        color='primary'
        shape="rounded"
        showFirstButton 
        showLastButton
        className='pagination'
        page={currentPage}
        onChange={handleChange}
      />
    </>
  );
};
export default TvShowsPage;
