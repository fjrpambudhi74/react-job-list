import React, { useState } from 'react'
import { GoogleLogout } from "react-google-login";

const Dashboard = ({setLogin}) => {

  const [search, setSearch] = useState({
    description: '',
    location: '',
    fullTime: false
  })

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
    console.log(search)
  }

  const clientId =
    "438375057615-86gf8du179pahebqq8jelnj06hcl1i4g.apps.googleusercontent.com";

  const logOut = () => {
    setLogin(null);
  };
  return (
    <>
      <h1>Dashboard</h1>
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
      <GoogleLogout
        clientId={clientId}
        buttonText="Log out"
        onLogoutSuccess={logOut}
      />
    </>
  );
}

export default Dashboard