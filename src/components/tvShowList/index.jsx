import React from "react";
import TvShow from "../tvShowCard";
import Grid from "@mui/material/Grid";

const TvShowList = ( {tvShows}) => {
  let tvShowCards = tvShows.map((t) => (
    <Grid key={t.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TvShow key={t.id} tvShow={t} />
    </Grid>
  ));
  return tvShowCards;
};

export default TvShowList;
