import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: { 
    position: "fixed",
    top: 50,
    right: 2,
  },
};

const TvShowDetails = ( {tvShow}) => {

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {tvShow.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {tvShow.genres.map((g) => (    //constructing a shows's list of genres at runtime
          <li key={g.name}>
            <Chip label={g.name}  />
          </li>
        ))}
      </Paper>


      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Countrys" sx={styles.chipLabel} color="primary" />
        </li>
        {tvShow.production_companies.map((c) => (    //constructing a movie's list of production companies at runtime
          <li key={c.name}>
            <Chip label={c.name}  />
          </li>
        ))}
      </Paper>


      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${tvShow.numer_of_seasons} seasons.`} />
      </Paper>
      </>
  );
};
export default  TvShowDetails ;
