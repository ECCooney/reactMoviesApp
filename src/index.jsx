import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
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
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignupPage />} />
							<Route
								path="/movies/:id"
								element={
									<ProtectedRoute>
										<MoviePage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/movies/upcoming"
								element={
									<ProtectedRoute>
										<UpcomingMoviesPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/movies/toprated"
								element={
									<ProtectedRoute>
										<TopRatedMoviesPage />
									</ProtectedRoute>
								}
							/>
							<Route path="/" element={<HomePage />} />
							<Route path="*" element={<Navigate to="/" />} />
							<Route
								path="/reviews/:id"
								element={
									<ProtectedRoute>
										<MovieReviewPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/reviews/form"
								element={
									<ProtectedRoute>
										<AddMovieReviewPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/fantasymovie"
								element={
									<ProtectedRoute>
										<FantasyMoviePage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/tvshows"
								element={
									<ProtectedRoute>
										<TvShowsPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/tvshows/:id"
								element={
									<ProtectedRoute>
										<TvShowsDetailsPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/actor/:id"
								element={
									<ProtectedRoute>
										<ActorDetailsPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/movies/favourites"
								element={
									<ProtectedRoute>
										<FavouriteMoviesPage />
									</ProtectedRoute>
								}
							/>
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
