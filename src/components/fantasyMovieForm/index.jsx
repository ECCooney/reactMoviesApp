import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import genres from "./genreCategories";
import styles from "./styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const FantasyMovieForm = ({ movie }) => {
    const defaultValues = {
      title: "",
      overview: "",
      agree: false,
      genre: "",
      releaseDate: "",
      runtime: "",
      productionCompany:"",

      
    };
    const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm(defaultValues);
    const navigate = useNavigate();
    const context = useContext(MoviesContext);
    const [genre, setGenre] = useState(3);
    const [open, setOpen] = useState(false);
  
  
    const handleGenreChange = (event) => {
      setGenre(event.target.value);
    };
  
    const handleSnackClose = (event) => {
      setOpen(false);
      navigate("/movies/favourites");
    };
  
    const onSubmit = (fantasyMovie) => {
      fantasyMovie.genre = genre;
      context.addFantasyMovie(fantasyMovie);
      // console.log(fantasyMovie);
      setOpen(true);
    };
  
    return (
      <Box component="div" sx={styles.root}>
        <Typography component="h2" variant="h3">
          Create a Fantasy Movie
        </Typography>
        <Snackbar
          sx={styles.snack}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleSnackClose}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={handleSnackClose}
          >
            <Typography variant="h4">
              Thank you
            </Typography>
          </Alert>
        </Snackbar>
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
            control={control}
            name="genre"
            render={({ field: { onChange, value } }) => (
              <TextField
                id="select-genre"
                select
                variant="outlined"
                label="Genre Select"
                value={genre}
                onChange={handleGenreChange}
                helperText="Don't forget your genre"
              >
                {genres.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
  
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
  };
  
  export default FantasyMovieForm;
  

