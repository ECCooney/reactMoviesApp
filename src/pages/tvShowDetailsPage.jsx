import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TvShowDetails from "../components/tvShowDetails";
import PageTemplate from "../components/templateTvShowPage";
// import useTvShow from "../hooks/useTvShow";

import { getTvShow } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const TvShowDetailsPage = () => {
  const { id } = useParams();

  const { data: tvShow, error, isLoading, isError } = useQuery(
    ["tvShow", { id: id }],
    getTvShow
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {tvShow ? (
        <>
          <PageTemplate tvShow={tvShow}>
            <TvShowDetails tvShow={tvShow} />   {/*the children prop of TemplateTvShowPage is bound to this*/}
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for tvShow details</p> 
      )}
    </>
  );
};

export default TvShowDetailsPage;
