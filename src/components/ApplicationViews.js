import { Route, Redirect } from "react-router-dom";
import React from "react";
import BrandList from './brands/BrandList';
import BrandListFiltered from './brands/BrandListFiltered';
import NewBrand from './brands/NewBrand';
import EditBrand from './brands/EditBrand';
import Home from './home/Home';
import Login from './auth/Login';
import Registration from './auth/Registration';
import Brewhouse from './brewhouse/Brewhouse';

const ApplicationViews = (props) => {
	// Check if credentials are in session storage returns true/false (credentials are there or its not) based on the props. hasUser & setUser from Application Views (parent component)
	//passes user credentials brought in from login into browser session storage
	const setUser = props.setUser;
	//state of current user, tell us if someone is logged in or not based on isAuthenticated having a value in browser session storage
	const hasUser = props.hasUser;
		
	return (
		<React.Fragment>

			{/* pass the `setUser` function was Login component (no properties), but now we want to pass in props it needs to be render (something other than component) */}
				{/* Remember to update the handleLogin() function in the <Login> component to use the setUser() function. */}
			{/* Login */}
			<Route
				exact
				path="/Login" 
				render={props => {
    				return <Login setUser={setUser} {...props} />
  				}}
			/>
			{/* Registration */}
				<Route 
				exact
				path="/Registration" 
				render={props => {
    				return <Registration setUser={setUser} {...props} />
  				}}
			/>
			{/* Home / Welcome */}
			<Route
				exact
				path="/"
				render={props => {
					return <Home {...props} />;
				}}
			/>
			{/* New Brand Generator, make sure to pass props through so newBrand can accept a paramater of props to use later in the code (for props.history.push) */}
			<Route
				exact
				path="/NewBrand"
				render={props => {
					if (hasUser) {
						return <NewBrand {...props} />
					} else {
						return <Redirect to="/Login" />
					}
				}}
			/>
			{/* Brand List */}
            <Route
				exact
				path="/BrandList"
				render={props => {
					if (hasUser) {
						return <BrandList {...props} hasUser={hasUser} />
					} else {
						return <Redirect to="/Login" />
					}
				}}
			/>
            
			{/* Brand List filtered by statusId */}
			<Route
				
				path="/BrandList/:statusId(\d+)"
				render={props => {
					if (hasUser) {
						return <BrandListFiltered {...props} />
					} else {
						return <Redirect to="/Login" />
					}	
				}}
			/>
			{/* Edit Brand already in database */}
			{/* colon ":" lets route know its a dynamic path and (\d+) lets it know to only look at integer of id passed in */}
			<Route 
				path="/brands/:brandId(\d+)/edit" 
				render={props => {
					if (hasUser) {
						return <EditBrand {...props} />
					} else {
						return <Redirect to="/Login" />
					}
				}} 
			/>
			{/* Brewhouse to setup production, starting with inventory numbers, moving into tank tracking, */}
			<Route 
				path="/brewhouse" 
				render={props => {
					if (hasUser) {
						return <Brewhouse {...props} />
					} else {
						return <Redirect to="/Login" />
					}
				}} 
			/>
			
        </React.Fragment>

    )
}

export default ApplicationViews