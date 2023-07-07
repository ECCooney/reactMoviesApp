import React from "react";
import Actor from "../actorCard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const styles = {
  paper: {
    marginTop: 0,
    padding: 16,
},
};

const ActorList = ({ credits }) => {
  let castCards = credits.cast.map((c) => (
    <Grid key={c.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Actor key={c.id} actor={c} />
    </Grid>
  ));

  return (
    <Paper className={styles.paper} elevation={24}>
      <Typography variant="h5">
        <Box sx={{ fontWeight: "bold" }}>Cast</Box>
      </Typography>
      <br></br>
      <Grid item container spacing={2}>
        {castCards}
      </Grid>
    </Paper>
  );
};

export default ActorList;