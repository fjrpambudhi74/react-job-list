import React, { useState } from 'react'
import { GoogleLogout } from "react-google-login";

const Dashboard = ({setLogin}) => {
  const [search, setSearch] = useState({
    description: '',
    location: '',
    fullTime: false
  })
  const [jobs, setJobs] = useState([])

  const handleInput = (event) => {
    const {name, value} = event.target
    if(name === 'fullTime') {
      setSearch((prevState) => ({...search, [name] : !prevState.fullTime}))
    } else {
      setSearch({...search, [name] : value})
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    fetchSearchJobs(search)
  }

  const fetchSearchJobs = async () => {
    const { description, location, fullTime } = search;
    try {
      const url =
        `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${description}&location=${location}&full_time=${fullTime}`;

      const response = await fetch(url)
      const result = await response.json()
      if(result) setJobs(result)
      console.log(jobs)
    } catch (error) {
      console.log(error)
    }
  }

  const clientId =
    "438375057615-86gf8du179pahebqq8jelnj06hcl1i4g.apps.googleusercontent.com";

  const logOut = () => {
    setLogin(null);
  };
  return (
    <>
      <h1>Dashboard</h1>
      <div className="job_search">
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={search.description}
          onChange={handleInput}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={search.location}
          onChange={handleInput}
        />
        <input
          type="checkbox"
          name="fullTime"
          checked={search.fullTime}
          onChange={handleInput}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
        {jobs.map((job, index) => (
          <div className="job_list" key={index}>
            <h4>{job.title}</h4>
            <p>{job.location}</p>
            <p>{job.type}</p>
          </div>
        ))}
      <GoogleLogout
        clientId={clientId}
        buttonText="Log out"
        onLogoutSuccess={logOut}
      />
    </>
  );
}

export default Dashboard