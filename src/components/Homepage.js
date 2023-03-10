import React, { useState, useEffect } from 'react'
import { GoogleLogout } from "react-google-login";
import JobItems from './JobItems';
import Header from "./Header";


const Homepage = ({setLogin}) => {
  const [search, setSearch] = useState({
    description: '',
    location: '',
    fullTime: false
  })
  const [jobs, setJobs] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')


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
      setErrorMsg('')
    } catch (error) {
      console.log(error)
      setErrorMsg('Something went wrong, please try again later')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(currentPage > 1) fetchSearchJobs();
    //eslint-disable-next-line
  }, [currentPage])


  const handleLoadMore = () => {
     if (isLoading) return;
     setCurrentPage((prev) => prev + 1);
  }

  const clientId =
    "438375057615-86gf8du179pahebqq8jelnj06hcl1i4g.apps.googleusercontent.com";

  const logOut = () => {
    setLogin(null);
  };
  return (
    <>
      <Header />
      <div className="job_search">
        <div>
          <label for="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={search.description}
            onChange={handleInput}
          />
        </div>
        <div>
          <label for="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={search.location}
            onChange={handleInput}
          />
        </div>
        <div>
          <label for="Fulltime">Full Time Only</label>
          <input
            type="checkbox"
            name="fullTime"
            checked={search.fullTime}
            onChange={handleInput}
          />
        </div>

        <button className='job_search__button' onClick={handleSearch}>Search</button>
      </div>
      <JobItems jobs={jobs} />
      {errorMsg && <p>{errorMsg}</p>}
      {hasMore && (
        <button className="job_btn_more" onClick={handleLoadMore}>
          {isLoading ? "Loading..." : "More Jobs"}
        </button>
      )}
      <br />
      <div className='job_logout'>
      <GoogleLogout
        clientId={clientId}
        buttonText="Log out"
        onLogoutSuccess={logOut}
      />
      </div>
    </>
  );
}

export default Homepage