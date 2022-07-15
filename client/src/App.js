import "./App.css";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeProfile from "./Pages/Auth/EmployeeProfile";
const Login = React.lazy(() => import("./Pages/Guest/Login"));
const HomeDashboard = React.lazy(() => import("./Pages/Auth/HomeDashboard"));

function App() {
	return (
		<Suspense
			fallback={
				<div className="w-screen h-screen">
					<div className=" mt-96">
						<h3>Loading...</h3>
					</div>
				</div>
			}
		>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<HomeDashboard />} />
				<Route
					path="/employee-profile/:id"
					element={<EmployeeProfile />}
				/>
			</Routes>
		</Suspense>
	);
}

export default App;
