import React from "react";
import AsideBarComponent from "../HeaderComponent/AsideBarComponent";
import NavComponent from "../HeaderComponent/NavComponent";

const DashboardLayout = ({ children }) => {
	return (
		<section className="flex justify-between h-screen overflow-hidden">
			<div className="w-1/6 bg-black h-full overflow-hidden overflow-y-auto">
				<AsideBarComponent />
			</div>
			<div className="w-5/6 overflow-hidden overflow-y-auto">
				<NavComponent />
				{children}
			</div>
		</section>
	);
};

export default DashboardLayout;
