import React, { useState,useEffect } from "react";
import UserManager from "../../modules/UserManager";


const Login = (props) => {

  //state of input fields for user login
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  //userList brought in to compare againsted credentials
  const [usersList, setUsersList] = useState([]);

  //Get all user data
  const getUsers = () => {
    return UserManager.getAll().then((response) => {
      setUsersList(response)
    });
  };
 

  // Update state based on event id.. whenever an input field is edited the value of that id is replaced with the new value and state is set
  //state is not mutable so an objct must hold all of state , be adjusted and then can set the useState
  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  //Handle login invoked by button
  const verifyCredentials = (e) => {
    // prevent default, keeps the page from refreshing and loosing credentials entered
    e.preventDefault();
    //compares each user.email from the database to the credentials.email
    //if equivilant it sets setUser(credentials for sessionstorage) with the users information from the database
    usersList.map((singleUser) => {
      console.log("singleUser",singleUser)
      console.log("credentials",credentials)
      if (singleUser.email === credentials.email) { 
        props.setUser(singleUser);
      }
      return (
        props.history.push("/NewBrand")
      )
    })
  }

  useEffect(() => {
    getUsers()
}, []);
  return (
      //onSubmit attribute for when i click the submit button for the form, start the function
    <form onSubmit={verifyCredentials}>
      <fieldset>
        <h3>Please sign in</h3>
        <div className="formgrid">
          <input onChange={handleFieldChange} type="email"
          //id="email" directly relates to email "" of state
            id="email"
            placeholder="Email address"
            required="" autoFocus="" />
          <label htmlFor="inputEmail">Email address</label>

          <input onChange={handleFieldChange} type="password"
            //id="password" directly relates to password "" of state setCredentials
            id="password"
            placeholder="Password"
            // required forces to be be a given value, the  empty string 
            required="" />
          <label htmlFor="inputPassword">Password</label>
        </div>
        <button type="submit">Sign in</button>
      </fieldset>
    </form>
  );
};

export default Login;