import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import FavouriteTvShowsPage from "./pages/favouriteTvShowsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import TvShowsPage from "./pages/tvShowsPage";
import TvShowsDetailsPage from "./pages/tvShowDetailsPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import FantasyMoviePage from "./pages/fantasyMoviePage";
import LoginPage from "./pages/loginPage";
import AuthProvider from "./contexts/authContext";
import ProtectedRoute from "./components/protectedRoute";
import SignupPage from "./pages/signupPage";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 360000,
			refetchInterval: 360000,
			refetchOnWindowFocus: false,
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthProvider>
					<SiteHeader />
					<MoviesContextProvider>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="*" element={<Navigate to="/" />} />
							<Route path="/tvshows" element={<TvShowsPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignupPage />} />
							<Route element={<ProtectedRoute />}>
								<Route path="/movies/:id" element={<MoviePage />} />
								<Route
									path="/movies/upcoming"
									element={<UpcomingMoviesPage />}
								/>
								<Route
									path="/movies/toprated"
									element={<TopRatedMoviesPage />}
								/>
								<Route path="/reviews/:id" element={<MovieReviewPage />} />
								<Route path="/reviews/form" element={<AddMovieReviewPage />} />
								<Route path="/fantasymovie" element={<FantasyMoviePage />} />
								<Route path="/tvshows/:id" element={<TvShowsDetailsPage />} />
								<Route path="/actor/:id" element={<ActorDetailsPage />} />
								<Route
									path="/movies/favourites"
									element={<FavouriteMoviesPage />}
								/>
								<Route
									path="/tvShows/tvfavourites"
									element={<FavouriteTvShowsPage />}
								/>
							</Route>
						</Routes>
					</MoviesContextProvider>
				</AuthProvider>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
