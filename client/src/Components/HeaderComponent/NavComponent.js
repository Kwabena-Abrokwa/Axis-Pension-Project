import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavComponent = () => {
	const [userControl, setUserControl] = useState(false);

	const navigate = useNavigate();

	const handleUserControl = () => {
		setUserControl(!userControl);
	};

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
	};

	return (
		<>
			<nav className="flex justify-end px-20 py-8 cursor-pointer relative">
				<div
					className="p-2 w-56 text-center h-12 my-auto"
					onClick={handleUserControl}
				>
					<h4>{localStorage.getItem("admin_name")}</h4>
				</div>
				{userControl ? (
					<div className="absolute h-16 top-20 w-56 border rounded-lg">
						<button
							className="w-11/12 mx-auto bg-red-600 block p-2 my-3 text-white"
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				) : null}
			</nav>
		</>
	);
};

export default NavComponent;
