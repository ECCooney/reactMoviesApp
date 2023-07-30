import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import styles from "./styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Multiselect from "multiselect-react-dropdown";
import DatePicker from "react-datepicker";

//resaving the code causes the page to load as expected

export default function FantasyMovieForm(props) {
	const context = useContext(MoviesContext);
	const [fantasyGenre, setGenre] = useState("action");
	const [open, setOpen] = useState(false);
	const [releaseDate, setReleaseDate] = useState(new Date());

	const defaultValues = {
		title: "",
		overview: "",
		fantasyGenre: "action",
		releaseDate: "",
		runtime: "",
		productionCompany: "",
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm(defaultValues);

	const { data, error, isLoading, isError } = useQuery("genres", getGenres);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <h1>{error.message}</h1>;
	}

	const genres = data?.genres;
	if (genres[0].name !== "All") {
		genres.unshift({ id: "0", name: "All" });
	}
	const navigate = useNavigate();

	const handleDateChange = (releaseDate) => {
		setReleaseDate(releaseDate);
	};

	const handleGenreChange = (event) => {
		setGenre(event.target.value);
	};

	const onSubmit = (fantasyMovie) => {
		fantasyMovie.title = title;
		fantasyMovie.overview = overview;
		fantasyMovie.genre = fantasyGenre;
		fantasyReleaseDate.genre = releaseDate;
		context.addFantasyMovie(fantasyMovie);
		// console.log(fantasyMovie);
		setOpen(true);
	};

	return (
		<Box component="div" sx={styles.root}>
			<Typography component="h2" variant="h3">
				Create a Fantasy Movie
			</Typography>
			<form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
				<Controller
					name="title"
					control={control}
					rules={{ required: "Title is required" }}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							sx={{ width: "40ch" }}
							variant="outlined"
							margin="normal"
							required
							onChange={onChange}
							value={value}
							id="title"
							label="Movie Title"
							autoFocus
						/>
					)}
				/>
				{errors.title && (
					<Typography variant="h6" component="p">
						{errors.title.message}
					</Typography>
				)}
				<Controller
					name="overview"
					control={control}
					rules={{
						required: "Overview cannot be empty.",
						minLength: { value: 10, message: "Overview is too short" },
					}}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							value={value}
							onChange={onChange}
							label="Overview text"
							id="overview"
							multiline
							minRows={10}
						/>
					)}
				/>
				{errors.overview && (
					<Typography variant="h6" component="p">
						{errors.overview.message}
					</Typography>
				)}

				<Controller
					name="production company"
					control={control}
					rules={{
						required: "Production Company cannot be empty.",
					}}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							value={value}
							onChange={onChange}
							label="Production Company"
							id="productionCompany"
						/>
					)}
				/>
				{errors.productionCompany && (
					<Typography variant="h6" component="p">
						{errors.productionCompany.message}
					</Typography>
				)}

				<Controller
					control={control}
					name="fantasyGenre"
					render={({ field: { onChange, value } }) => (
						<TextField
							id="select-fantasyGenre"
							select
							variant="outlined"
							margin="normal"
							label="Genre Select"
							value={fantasyGenre}
							onChange={handleGenreChange}
						>
							{genres.map((genre) => {
								return (
									<MenuItem key={genre.id} value={genre.id}>
										{genre.name}
									</MenuItem>
								);
							})}
						</TextField>
					)}
				/>

				<Controller
					name="releaseDate"
					control={control}
					render={({ onChange, value }) => (
						<DatePicker
							id="releaseDate"
							selected={value}
							onChange={handleDateChange}
							margin="normal"
							value={releaseDate}
							label="Release Date"
						/>
					)}
				/>

				<br></br>
				<br></br>

				<Box sx={styles.buttons}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={styles.submit}
					>
						Submit
					</Button>
					<Button
						type="reset"
						variant="contained"
						color="secondary"
						sx={styles.submit}
						onClick={() => {
							reset({
								title: "",
								overview: "",
							});
						}}
					>
						Reset
					</Button>
				</Box>
			</form>
		</Box>
	);
}
