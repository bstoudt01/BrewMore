import React,{ useState } from "react";
import Navbar from "./nav/Navbar";
import ApplicationViews from "./ApplicationViews";

//BREWMORE - Innovating Craft Beer Tools for Everyone
//Front End Capstone - Cohort 41 @ NSS
//Created by Brett Stoudt

//Displays NavBar and available routing options based on hasUser / sessionStorage
const BrewMore = () => {
      	// Check if credentials are in session storage returns true/false (credentials are there or its not)
  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  //state of current user, tell us if someone is logged in or not based on isAuthenticated having a value in browser session storage
  const [hasUser, setHasUser] = useState(isAuthenticated());

  //places user credentials brought in from login into browser session storage
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