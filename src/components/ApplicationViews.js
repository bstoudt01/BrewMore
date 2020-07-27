import { Route, Redirect } from "react-router-dom";
import React from "react";
import BrandList from './brands/BrandList'
import NewBrand from './brands/NewBrand'
const ApplicationViews = (props) => {
	// Check if credentials are in session storage returns true/false (credentials are there or its not) based on the props. hasUser & setUser from Application Views (parent component)

	
	return (
		<React.Fragment>

			<Route
				exact
				path="/"
				render={props => {
					return <BrandList />;
				}}
			/>
			{/* Make sure you add the `exact` attribute here  and pass through ...props so animal list can accept a paramater of props to use later in the code (for adding a new animal) */}
			
			<Route
				exact
				path="/NewBrand"
				render={props => {
					return <NewBrand />;
				}}
			/>

            <Route
				exact
				path="/BrandList"
				render={props => {
					return <BrandList />;
				}}
			/>
        </React.Fragment>

    )
}

export default ApplicationViews