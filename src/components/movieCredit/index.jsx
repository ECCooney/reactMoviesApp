import React from "react";

const MovieCredit =  ({ credit }) => {
  return (
    <>
      <p>Actor: {credit.name} </p>
      <p>as {credit.character} </p>
    </>
  );
};
export default MovieCredit
