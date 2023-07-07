import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

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

export default function ActorCard({ actor }) {
  const navigate = useNavigate();
  const handleActor = () => {
    navigate(`/actors/${actor.id}`);
  };

  return (
    <Card className={styles.card} elevation={24}>
      <CardActions className={styles.header}>
        <Typography>
          <Box sx={{ fontSize: "0.8125rem", color: "white", margin: "4px" }}>
            {actor.character}
          </Box>
        </Typography>
      </CardActions>
      <CardMedia
        className={styles.media}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : `${process.env.PUBLIC_URL}/assets/actor.jpg`
        }
      />
      <CardActions className={styles.chips}>
        <Chip
          className={styles.chip}
          onClick={handleActor}
          onDelete={handleActor}
          deleteIcon={<DeleteIcon />}
          label={actor.name}
        />
      </CardActions>
    </Card>
  );
}