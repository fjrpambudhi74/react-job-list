import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

const Dashboard = ({setLogin}) => {
  const [search, setSearch] = useState({
    description: '',
    location: '',
    fullTime: false
  })
  const [jobs, setJobs] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false);


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
    fetchSearchJobs()
  }

  const fetchSearchJobs = async () => {
    const { description, location, fullTime } = search;
    console.log(currentPage);
    try {
      setIsLoading(true)
      const url =
        `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${currentPage}&description=${description}&location=${location}&full_time=${fullTime}`;

      const response = await fetch(url)
      const result = await response.json()
      const res = result?.filter((el) => el !== null)
      setHasMore(res.length > 0);
      setJobs((prev) => [...prev, ...res]);
      console.log(jobs)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(currentPage > 1) fetchSearchJobs();
  }, [currentPage])


  const handleLoadMore = () => {
     if (isLoading) return;
     setCurrentPage((prev) => prev + 1);
    //  fetchSearchJobs()
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
        <Link to={`/job/${job.id}`}>
          <div className="job_list" key={index}>
            <h4>{job.title}</h4>
            <p>{job.location}</p>
            <p>{job.type}</p>
          </div>
        </Link>
      ))}
      {hasMore && (
        <button className="loading-more-btn" onClick={handleLoadMore}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
      <br />
      <GoogleLogout
        clientId={clientId}
        buttonText="Log out"
        onLogoutSuccess={logOut}
      />
    </>
  );
}

export default Dashboard