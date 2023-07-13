import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

function MovieListPageTemplate({ movies, title, release_date, action }) { 
   //the above is shorthand for function MovieListPageTemplate( props ) {
   // const movies = props.movies
   // const title = props.title
  //  const action = props.action (where action refers to the add favourite render prop)

  const [titleFilter, setTitleFilter] = useState("");
  const [releaseDateFilter, setReleaseDateFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return m.release_date.search(releaseDateFilter) !== -1;
    });

  const handleChange = (type, value) => {
    if (type === "title") setTitleFilter(value);
    else if (type === "release_date") setReleaseDateFilter(value);
    else setGenreFilter(value);
  };

  return (
   <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
           <MovieList action={action} movies={displayedMovies} />
        </Grid>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          releaseDateFilter={releaseDateFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>  
  );
}
export default MovieListPageTemplate;
