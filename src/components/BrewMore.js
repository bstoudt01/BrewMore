import React,{ useState } from "react";
import Navbar from "./nav/Navbar";
import ApplicationViews from "./ApplicationViews";
//import useState from "react"
const BrewMore = () => {
      	// Check if credentials are in session storage returns true/false (credentials are there or its not)
  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  //enable us to set state of current user, tell us if someone is logged in or not based on isAuthenticated having a value of session storage
  const [hasUser, setHasUser] = useState(isAuthenticated());

  //function that allows us to change what user is in our app
  const setUser = user => {
    sessionStorage.setItem("credentials", JSON.stringify(user));
    setHasUser(isAuthenticated());
  };


    return (
        <>
        <Navbar hasUser={hasUser}/>
        <ApplicationViews hasUser={hasUser} setUser={setUser}/>
        </>
    )
}

export default BrewMore