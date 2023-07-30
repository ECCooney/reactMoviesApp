import React, { useContext } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromTvFavourites from "../components/cardIcons/removeFromTvFavourites";
import WriteReview from "../components/cardIcons/writeReview";

const FavouriteTvShowsPage = (props) => {
	const { tvFavourites: tvShowIds } = useContext(MoviesContext);

	// Create an array of queries and run them in parallel.
	const favouriteTvShowsQueries = useQueries(
		tvShowIds.map((tvShowId) => {
			return {
				queryKey: ["tvShow", { id: tvShowId }],
				queryFn: getTvShow,
			};
		})
	);
	// Check if any of the parallel queries is still loading.
	const isLoading = favouriteTvShowsQueries.find((t) => t.isLoading === true);

	if (isLoading) {
		return <Spinner />;
	}

	const tvShows = favouriteTvShowsQueries.map((q) => q.data);

	return (
		<PageTemplate
			title="Favourite TvShows"
			tvShows={tvShows}
			action={(tvShow) => {
				return (
					<>
						<RemoveFromTvFavourites tvShow={tvShow} />
						<WriteReview movie={tvShow} />
					</>
				);
			}}
		/>
	);
};

export default FavouriteTvShowsPage;
