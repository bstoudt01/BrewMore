import { Route, Redirect } from "react-router-dom";
import React from "react";
import BrandList from './brands/BrandList'
import BrandListFiltered from './brands/BrandListFiltered'
import NewBrand from './brands/NewBrand'
import EditBrand from './brands/EditBrand'
import Home from '../home/Home'
import Login from './auth/Login'
const ApplicationViews = (props) => {
	// Check if credentials are in session storage returns true/false (credentials are there or its not) based on the props. hasUser & setUser from Application Views (parent component)
	const hasUser = props.hasUser;
	const setUser = props.setUser;
	
	return (
		<React.Fragment>

			{/* pass the `setUser` function was Login component (no properties), but now we want to pass in props it needs to be render (something other than component) */}
				{/* Remember to update the handleLogin() function in the <Login> component to use the setUser() function. */}
			<Route 
				path="/login" 
				render={props => {
    				return <Login setUser={setUser} {...props} />
  				}}
			/>

			<Route
				exact
				path="/"
				render={props => {
					return <Home />;
				}}
			/>
			{/* Make sure you add the `exact` attribute here  and pass through ...props so animal list can accept a paramater of props to use later in the code (for adding a new animal) */}
			
			<Route
				exact
				path="/NewBrand"
				render={props => {
					if (hasUser) {
						return <NewBrand {...props} />
					} else {
						return <Redirect to="/login" />
					}
				}}
			/>

            <Route
				exact
				path="/BrandList"
				render={props => {
					if (hasUser) {
						return <BrandList {...props} />
					} else {
						return <Redirect to="/login" />
					}
				}}
			/>
            
			{/* brand list filtered by statusId */}
			<Route
				
				path="/BrandList/:statusId(\d+)"
				render={props => {
					if (hasUser) {
						return <BrandListFiltered {...props} />
					} else {
						return <Redirect to="/login" />
					}	
				}}
			/>

			{/* colon ":" lets route know its a dynamic path and (\d+) lets it know to only look at integer of id passed in */}
			<Route 
				path="/brands/:brandId(\d+)/edit" 
				render={props => {
					if (hasUser) {
						return <EditBrand {...props} />
					} else {
						return <Redirect to="/login" />
					}
				}} 
			/>
			
        </React.Fragment>

    )
}

export default ApplicationViews