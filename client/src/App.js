import "./App.css";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Login = React.lazy(() => import("./Pages/Guest/Login"));
const HomeDashboard = React.lazy(() => import("./Pages/Auth/HomeDashboard"));
const EmployeeProfile = React.lazy(() =>
	import("./Pages/Auth/EmployeeProfile")
);

function App() {
	return (
		<Suspense
			fallback={
				<div className="w-screen h-screen">
					<div className="mt-96">
						<h3 className="text-center text-3xl">Loading...</h3>
					</div>
				</div>
			}
		>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<HomeDashboard />} />
				<Route path="/employee-profile/:id" element={<EmployeeProfile />} />
			</Routes>
		</Suspense>
	);
}

export default App;
