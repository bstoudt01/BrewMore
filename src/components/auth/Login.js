import React, { useState } from "react";
import UserManager from "../../modules/UserManager";

//props coming from parent component (.. react router dom)
const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [usersList, setUsersList] = useState([])

  const getUsers = () => {
    return UserManager.getAll().then((response) => {
      setUsersList(response)
    })
  } 
  getUsers()

  // Update state whenever an input field is edited
  //as we hear those changes, state changes and makes those updates (evey key)
  // matches value in input field with a value in state
  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };
  // function to handle login invoked by button
  const verifyCredentials = (e) => {
    // prevent default, keeps the page from refreshing and loosing credentials entered

    e.preventDefault();

    usersList.map((singleUser) => {
      console.log("singleUser",singleUser)
      console.log("credentials",credentials)
      if (credentials.email === singleUser.email) { 
        props.setUser(singleUser);
        props.history.push("/brandList");
      }
    })
  }

  return (
      //onSubmit = when i click the button, start this function
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