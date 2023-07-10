import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 200,
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  header: {
    backgroundColor: "#3f51b5",
    justifyContent: "center",
  },
  media: { height: 300 },
  
  chips: {
    display: "flex",
    justifyContent: "center",
    padding: 2,
    alignItems: "normal",
  },
  chip: {
    margin: 5,
    color: "#3f51b5",
    backgroundColor: "transparent",
  },
};

export default function ActorCard({actor}) {
  return (
    <Card sx={styles.card}>
      <CardMedia
        sx={styles.media}
        image={
          actor.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={60}>
            <Typography variant="h5" component="p">{actor.name}{" "} Plays </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="h5" component="p">{actor.character}{" "}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      <Link to={`/actor/${actor.id}`}>
      <Button variant="outlined" size="medium" color="primary">
          Actor Details
        </Button>
      </Link>
      </CardActions>
    </Card>
  );
}