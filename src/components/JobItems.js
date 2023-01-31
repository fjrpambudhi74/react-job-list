import React from 'react'
import { Link } from "react-router-dom";

const JobItems = ({jobs}) => {
  return (
    <>
      {jobs.map((job, index) => (
        <Link to={`/job/${job.id}`}>
          <div className="job_list" key={index}>
            <h4>{job.title}</h4>
            <p>{job.location}</p>
            <p>{job.type}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default JobItems