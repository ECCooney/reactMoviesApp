import React from "react";
import FantasyMovieForm from "../components/fantasyMovieForm";
import Header from "../components/headerMovieList";

const FantasyMoviePage = (props) => {
    return (
        <>
              <Header title={"My Fantasy Movie"} />
              <FantasyMovieForm/>
        </>
      );
    };
    
    export default FantasyMoviePage;