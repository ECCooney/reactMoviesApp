import React  from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
    },
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
};

const ActorHeader = (props) => {
    const navigate = useNavigate();
    const actor = props.actor;

    return (
        <Paper component="div" sx={styles.root}>
          <IconButton aria-label="go back" onClick={() => navigate(-1)}>
            <ArrowBackIcon color="primary" fontSize="large" />
          </IconButton>
          <Typography variant="h4" component="h3">
            <a href={actor.homepage}>{actor.name}</a>
          </Typography>
          <IconButton aria-label="go forward" onClick={() => navigate(1)}>
            <ArrowForwardIcon color="primary" fontSize="large" />
          </IconButton>
        </Paper>
      );
    };
    
    export default ActorHeader;