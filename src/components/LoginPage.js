import React, {useEffect} from 'react'
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const LoginPage = () => {
  const clientId =
    '438375057615-86gf8du179pahebqq8jelnj06hcl1i4g.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    console.log("success:", res);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  return (
    <>
      <h1>Login Page</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
}

export default LoginPage