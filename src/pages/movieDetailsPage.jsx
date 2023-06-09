import React, {useState, useEffect}  from "react";
import { useParams } from "react-router-dom";
import MovieHeader from "../components/headerMovie/";
import MovieDetails from "../components/movieDetails/";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const styles = {
  imageListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
};

const MoviePage = (props) => {
  const { id } = useParams(); //useParams hook (from react-router) allows the component to extract the movie id from the browser's parameterized URL address
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => { //uses the API's movie endpoint to get the full details on the film.
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((movie) => {
        // console.log(movie)
        setMovie(movie);
      });
  }, [id]);

  useEffect(() => { //gets the set of images for the same movie.
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.posters)
      .then((images) => {
        // console,log(images)
        setImages(images);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {movie ? (   //use the ternary operator (?:) to check the movie object's status. When it is undefined (boolean false), a placeholder text - 'Waiting for API data' - is displayed.
        <>
          <MovieHeader movie={movie} />
          <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid item xs={3}>
              <div sx={styles.imageListRoot}>
                <ImageList cols={1}>
                  {images.map((image) => (
                    <ImageListItem
                      key={image.file_path}
                      sx={styles.gridListTile}
                      cols={1}
                    >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                      alt={image.file_path}
                    />                   
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </Grid>
            <Grid item xs={9}>
              <MovieDetails movie={movie} />
            </Grid>
          </Grid>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  );
};

export default MoviePage;
