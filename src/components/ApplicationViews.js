import { Route } from "react-router-dom";
import React from "react";
import BrandList from './brands/BrandList'
import NewBrand from './brands/NewBrand'
import EditBrand from './brands/EditBrand'
import Home from '../home/Home'
//import NewBrandStart from './brands/NewBrandStart'

//import Redirect from "react-router-dom";

const ApplicationViews = (props) => {
	// Check if credentials are in session storage returns true/false (credentials are there or its not) based on the props. hasUser & setUser from Application Views (parent component)

	
	return (
		<React.Fragment>

			<Route
				exact
				path="/home"
				render={props => {
					return <Home />;
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
					return <BrandList {...props} />;
				}}
			/>

			{/* colon ":" lets route know its a dynamic path and (\d+) lets it know to only look at integer of id passed in */}
			<Route 
				path="/brands/:brandId(\d+)/edit" 
				render={props => {
					return <EditBrand {...props} />
				}} 
			/>
			
        </React.Fragment>

    )
}

export default ApplicationViews