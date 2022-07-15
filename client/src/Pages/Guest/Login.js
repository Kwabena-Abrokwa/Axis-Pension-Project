import React, { useState } from "react";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import logo from "../../Assets/Logo/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../API/URL";
import axios from "axios";

const Login = () => {
	const [data, setdata] = useState({
		admin_name: "",
		password: "",
	});

	const navigate = useNavigate();

	const [loader, setloader] = useState(false);
	const [message, setmessage] = useState("");
	const [color, setcolor] = useState("red");

	const handleChange = (event) => {
		setdata({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setloader(true);
		if (data.admin_name === "" || data.password === "") {
            setloader(false);
			setmessage("All fields are required");
			return null;
		}
		await axios
			.post(`${BACKEND_URL}/loginAdmin`, data)
			.then(({ data }) => {
				if (data.auth === 1) {
					setloader(false);
					localStorage.setItem("admin_name", data.admin_name);
					localStorage.setItem("token", data.token);
					navigate("/dashboard");
				} else {
					setmessage(data.message);
					setcolor("red");
					setloader(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setloader(false);
			});
	};

	return (
		<section>
			<div className="lg:w-2/6 mx-auto mt-16">
				<div className="logo w-20 mx-auto">
					<img
						src={logo}
						alt="Swype logo"
						className="w-11/12 h-full mx-auto"
					/>
				</div>
				<div className="title text-center py-6">
					<h3 className="text-xl font-medium">Log in to your account</h3>
				</div>
				<div className="w-full lg:shadow-md lg:border lg:rounded-lg p-2 my-5">
					<form
						className="w-11/12 lg:w-5/6 mx-auto"
						onSubmit={handleLogin}
					>
						<div className="my-8">
							<label className="text-md font-semibold">Admin Name</label>
							<CustomInput
								type={"text"}
								value={data.admin_name}
								name={"admin_name"}
								handleChange={handleChange}
							/>
						</div>
						<div className="my-8">
							<label className="text-md font-semibold">Password</label>
							<CustomInput
								type={"password"}
								value={data.password}
								name={"password"}
								handleChange={handleChange}
							/>
						</div>
						<div className="flex justify-between items-center my-8">
							<div className="flex  items-center">
								<input type={"checkbox"} id={"remember"} />
								<p className="ml-2 cursor-pointer" id={"remember"}>
									Remember me
								</p>
							</div>
							<div>
								<Link to={"/forgot-password"}>
									<p className="text-gray-500">
										Forgot your password?
									</p>
								</Link>
							</div>
						</div>
						{message && (
							<div
								className="text-center p-4 my-8 rounded-lg w-full"
								style={{ backgroundColor: color }}
							>
								<p className="text-white">{message}</p>
							</div>
						)}
						<CustomButton>
							{loader ? "Please wait..." : "Login"}
						</CustomButton>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
