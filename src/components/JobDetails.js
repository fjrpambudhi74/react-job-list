import React from "react";
import { useLocation } from "react-router-dom";

const JobDetails = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <p>{state.type}</p>
      <h2>{state.title}</h2>
    </>
  );
};

export default JobDetails;
