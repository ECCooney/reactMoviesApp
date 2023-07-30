import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Pagination from "@mui/material/Pagination";

const HomePage = (props) => {
	const [currentPage, setCurrentPage] = useState(1);

	const handleChange = (event, value) => {
		setCurrentPage(value);
		console.log(value);
	};

	const { data, error, isLoading, isError } = useQuery(
		["discover", currentPage],
		() => getMovies(currentPage),
		{ keepPreviousData: true }
	);

	if (isLoading) {
		return <Spinner />;
	}
	if (isError) {
		return <h1>{error.message}</h1>;
	}

	const movies = data ? data.results : [];

	return (
		<>
			<PageTemplate
				title="Discover Movies"
				movies={movies}
				action={(movie) => {
					return <AddToFavouritesIcon movie={movie} />;
				}}
			/>
			<Pagination
				count="100"
				variant="outlined"
				color="primary"
				shape="rounded"
				showFirstButton
				showLastButton
				className="pagination"
				page={currentPage}
				onChange={handleChange}
			/>
		</>
	);
};
export default HomePage;
