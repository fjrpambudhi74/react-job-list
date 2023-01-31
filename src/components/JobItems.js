import React from 'react'
import { Link } from "react-router-dom";

const JobItems = ({jobs}) => {
  return (
    <>
    <h1 className='job_list__head'>Job List</h1>
      {jobs.map((job, index) => (
        <Link to={`/job/${job.id}`} className="job_list_link">
          <div className="job_list" key={index}>
            <h4>{job.title}</h4>
            <div className='job_list_type'>
            <p className='job_list_location'>{job.location}</p>
            <p className='job_list_full'>{job.type}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default JobItems