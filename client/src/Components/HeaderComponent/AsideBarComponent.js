import React from "react";
import { FaChartBar } from "react-icons/fa";

const AsideBarComponent = () => {
	return (
		<section className="text-white max-w-[14rem] mx-auto mt-40">
			<div className="mb-32 bg-gray-700 py-4 rounded-lg cursor-pointer flex items-center justify-center">
				<FaChartBar size={28} className="w-2/6" />
				<h3 className="text-md w-4/6">Overview</h3>
			</div>
		</section>
	);
};

export default AsideBarComponent;
