import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres, getCertifications } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

export default function FilterMoviesCard(props) {
  const { data: genreData, genreError, genreIsLoading, genreIsError } = useQuery("genres", getGenres);
  const { data: certData, error, isLoading, isError } = useQuery("certifications", getCertifications);

  if (isLoading || genreIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (genreIsError) {
    return <h1>{genreError.message}</h1>;
  }
  const genres = genreData.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const certifications = certData ? certData.certifications.US : [];

  const handleUserInput = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleUserInput(e, "title", e.target.value);
  };

  const handleYearChange = (e, props) => {
    handleUserInput(e, "release_date", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleUserInput(e, "genre", e.target.value);
  };

  const handleCertificationChange = (e) => {
    handleUserInput(e, "certification", e.target.value);
  };

  return (
    <>
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={styles.formControl}
          id="filled-search"
          label="Search by Title"
          type="search"
          value={props.titleFilter}
          variant="filled"
          onChange={handleTextChange}
        />
        <TextField
          sx={styles.formControl}
          id="filled-search"
          label="Search by Release Year"
          type="search"
          value={props.releaseDateFilter}
          variant="filled"
          onChange={handleYearChange}
        />
        <FormControl sx={styles.formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={styles.formControl}>
          <InputLabel id="certification-label">Certification</InputLabel>
          <Select
            labelId="certification-label"
            id="certification-select"
            value={props.certificationFilter}
            onChange={handleCertificationChange}
          >
            {certifications.map((certification) => {
              return (
                <MenuItem key={certification.order} value={certification.order}>
                  {certification.certification}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
    <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
        </CardContent>
      </Card>
      </>
  );
}
