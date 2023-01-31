import React from 'react'
import { GoogleLogout } from "react-google-login";

const Dashboard = ({setLogin}) => {
  const clientId =
    "438375057615-86gf8du179pahebqq8jelnj06hcl1i4g.apps.googleusercontent.com";

  const logOut = () => {
    setLogin(null);
  };
  return (
    <>
      <h1>Dashboard</h1>
      <GoogleLogout
        clientId={clientId}
        buttonText="Log out"
        onLogoutSuccess={logOut}
      />
    </>
  );
}

export default Dashboard