import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import MustWatchIcon from "../components/cardIcons/mustWatch";
import Pagination from '@mui/material/Pagination';


const UpcomingMoviesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    console.log(value)
  };

    const {  data, error, isLoading, isError }  = useQuery(['discover', currentPage], () => getUpcomingMovies(currentPage), { keepPreviousData: true })

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
    const upcomingMovies = data ? data.results : [];

  return (
    <>
    <PageTemplate
      title='Upcoming Movies'
      movies={upcomingMovies}
      action={(movie) => {
        return <MustWatchIcon movie={movie} />
      }}      
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

export default UpcomingMoviesPage;