import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
	const [myReviews, setMyReviews] = useState({});
	const [myFantasyMovie, setMyFantasyMovie] = useState({});
	const [favourites, setFavourites] = useState([]);
	const [tvFavourites, setTvFavourites] = useState([]);
	const [mustWatch, setMustWatch] = useState([]);

	const addToFavourites = (movie) => {
		let updatedFavourites = [...favourites];
		if (!favourites.includes(movie.id)) {
			updatedFavourites.push(movie.id);
		}
		setFavourites(updatedFavourites);
	};

	const addToTvFavourites = (tvShow) => {
		let updatedTvFavourites = [...tvFavourites];
		if (!tvFavourites.includes(tvShow.id)) {
			updatedTvFavourites.push(tvShow.id);
		}
		setTvFavourites(updatedTvFavourites);
	};

	const addToMustWatch = (movie) => {
		let updatedMustWatch = [...mustWatch];
		if (!mustWatch.includes(movie.id)) {
			updatedMustWatch.push(movie.id);
		}
		setMustWatch(updatedMustWatch);
		console.log(updatedMustWatch);
	};

	// We will use this function in a later section
	const removeFromFavourites = (movie) => {
		setFavourites(favourites.filter((mId) => mId !== movie.id));
	};

	const removeFromTvFavourites = (tvShow) => {
		setTvFavourites(tvFavourites.filter((tId) => tId !== tvShow.id));
	};

	const addReview = (movie, review) => {
		// NEW
		setMyReviews({ ...myReviews, [movie.id]: review });
	};

	const addFantasyMovie = (fantasyMovie) => {
		setMyFantasyMovie({ ...myFantasyMovie, fantasyMovie });
	};

	return (
		<MoviesContext.Provider
			value={{
				favourites,
				tvFavourites,
				addToFavourites,
				addToTvFavourites,
				removeFromFavourites,
				removeFromTvFavourites,
				addReview,
				addToMustWatch,
				addFantasyMovie,
			}}
		>
			{props.children}
		</MoviesContext.Provider>
	);
};

export default MoviesContextProvider;
