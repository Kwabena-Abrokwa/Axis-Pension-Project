import React, { useState, useEffect } from "react";
import CustomInput from "../../Components/Customs/CustomInput";
import CustomButton from "../../Components/Customs/CustomButton";
import TableComponent from "../../Components/Customs/TableComponent";
import DashboardLayout from "../../Components/Layout/DashboardLayout";
import CustomSelect from "../../Components/Customs/CustomSelect";
import { MdClose } from "react-icons/md";
import { BACKEND_URL } from "../../API/URL";
import axios from "axios";

const HomeDashboard = () => {
	const [data, setdata] = useState({
		title: "Mr.",
		surname: "",
		other_name: "",
		email: "",
		telephone: "",
		tin: "",
		SSNIT_no: "",
		dob: "",
		gender: "Male",
		maritial_status: "",
		address: "",
		appointment_date: "",
		img: "",
	});

	const [employeeBio, setEmployeeBio] = useState([]);

	const [modalHandler, setModalHandler] = useState(false);

	const [images, setimages] = useState("");

	const [loader, setloader] = useState(false);

	const [color, setcolor] = useState("red");

	const [message, setmessage] = useState("");

	const handleChange = (event) => {
		setdata({
			...data,
			[event.target.name]: event.target.value,
		});
		setmessage("");
	};

	const handleImage = (event) => {
		setdata({
			...data,
			img: event.target.files[0],
		});
		setmessage("");
		const imageFile = URL.createObjectURL(event.target.files[0]);
		setimages(imageFile);
	};

	const handleModal = () => {
		setModalHandler(!modalHandler);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setloader(true);

		if (
			data.other_name === "" ||
			data.surname === "" ||
			data.SSNIT_no === "" ||
			data.address === "" ||
			data.appointment_date === "" ||
			data.dob === "" ||
			data.email === "" ||
			data.telephone === "" ||
			data.tin === "" ||
			data.title === ""
		) {
			setmessage("All field are required");
			return null;
		}
		axios
			.post(`${BACKEND_URL}/createEmployeeBio`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(({ data }) => {
				if (data.success === true) {
					setcolor("green");
					setmessage(data.message);
					setloader(false);
					return null;
				}
				setmessage(data.message);
				setcolor("red");
				setloader(false);
				return null;
			})
			.catch((err) => {
				setmessage(err.response.data.message);
				setloader(false);
				setcolor("red");
				return null;
			});
	};

	//get all employees here
	const getAllEmployees = async () => {
		await axios
			.get(`${BACKEND_URL}/getAllEmployees`)
			.then(({ data }) => {
				if (data.success === false) {
					setmessage(data.message);
					setcolor("red");
					setloader(false);
					return null;
				}
				setEmployeeBio(data);
			})
			.catch((err) => {
				setmessage(err.response.data.message);
				setloader(false);
				setcolor("red");
				return null;
			});
	};

	useEffect(() => {
		getAllEmployees();
	}, []);

	return (
		<DashboardLayout>
			{modalHandler ? (
				<div className="fixed top-0 left-0 bg-[#00000099] h-screen w-screen h-full ">
					<div
						className="absolute right-5 top-5 cursor-pointer"
						onClick={handleModal}
					>
						<MdClose size={40} color={"#FFFFFF"} />
					</div>
					<form
						className="w-2/6 mx-auto bg-white my-24 overflow-hidden overflow-y-scroll rounded-xl"
						style={{ height: 600 }}
						onSubmit={handleSubmit}
						encType="multipart/form-data"
					>
						<div className="w-11/12 mx-auto p-8">
							<h2 className="text-xl font-bold">
								Fill forms to add a new employee.
							</h2>
							<h3 className="text-lg font-light py-3">
								Employee Bio Information
							</h3>
							<div className="mb-8">
								<label className="text-md font-semibold">Title</label>
								<CustomSelect
									selectName={"title"}
									value={data.title}
									handleChange={handleChange}
								>
									<option value={"Mr."}>Mr.</option>
									<option value={"Mrs."}>Mrs.</option>
								</CustomSelect>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">Surname</label>
								<CustomInput
									type={"text"}
									value={data.surname}
									name={"surname"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									Other name
								</label>
								<CustomInput
									type={"text"}
									value={data.other_name}
									name={"other_name"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">Email</label>
								<CustomInput
									type={"text"}
									value={data.email}
									name={"email"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									Telephone
								</label>
								<CustomInput
									type={"text"}
									value={data.telephone}
									name={"telephone"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">TIN</label>
								<CustomInput
									type={"text"}
									value={data.tin}
									name={"tin"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									SSNIT No
								</label>
								<CustomInput
									type={"text"}
									value={data.SSNIT_no}
									name={"SSNIT_no"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									Date of Birth
								</label>
								<CustomInput
									type={"date"}
									value={data.dob}
									name={"dob"}
									handleChange={handleChange}
								/>
							</div>
							<div className="mb-8">
								<label className="text-md font-semibold">Gender</label>
								<CustomSelect
									value={data.gender}
									selectName={"gender"}
									handleChange={handleChange}
								>
									<option value={"Male"}>Male</option>
									<option value={"Female"}>Female</option>
								</CustomSelect>
							</div>
							<div className="mb-8">
								<label className="text-md font-semibold">
									Maritial Status
								</label>
								<CustomSelect
									value={data.maritial_status}
									selectName={"maritial_status"}
									handleChange={handleChange}
								>
									<option value={"Married"}>Married</option>
									<option value={"Single"}>Single</option>
									<option value={"Divorced"}>Divorced</option>
								</CustomSelect>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									Employee Address
								</label>
								<CustomInput
									type={"text"}
									value={data.address}
									name={"address"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									Employee Appointment Date
								</label>
								<CustomInput
									type={"date"}
									value={data.appointment_date}
									handleChange={handleChange}
									name={"appointment_date"}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									Employee Passport Photo
								</label>
								<CustomInput
									type={"file"}
									value={data.img}
									name={"img"}
									handleChange={handleImage}
								/>
							</div>
							{images && (
								<div className="">
									{" "}
									<img
										src={images}
										alt="Images"
										className="w-full h-40"
									/>{" "}
								</div>
							)}
							{message && (
								<div
									className="text-center p-4 my-8 rounded-lg w-full"
									style={{ backgroundColor: color }}
								>
									<p className="text-white">{message}</p>
								</div>
							)}
							<CustomButton>
								{loader ? "Please wait..." : "Add Employee"}
							</CustomButton>
						</div>
					</form>
				</div>
			) : null}

			<div className="w-11/12 mx-auto mt-4">
				<div className="lg:flex items-center justify-end mb-10">
					<div className="w-60">
						<CustomButton onclick={handleModal}>
							Add Employee
						</CustomButton>
					</div>
				</div>
				<div>
					<div className="w-full mb-20">
						<div className="overflow-x-auto shadow-md sm:rounded-lg">
							<div className="inline-block min-w-full align-middle">
								<div className="overflow-hidden ">
									<table className="min-w-full divide-y divide-gray-200 table-fixed ">
										<thead className="bg-white  bg-white ">
											<tr>
												<th
													scope="col"
													className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
												>
													Employee ID
												</th>
												<th
													scope="col"
													className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
												>
													Employee Image
												</th>
												<th
													scope="col"
													className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
												>
													Employee Name
												</th>
												<th
													scope="col"
													className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
												>
													Email
												</th>
												<th
													scope="col"
													className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
												>
													Phone number
												</th>
												<th
													scope="col"
													className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
												>
													Date
												</th>
											</tr>
										</thead>
										<tbody className="bg-gray-100 divide-y divide-gray-200 bg-white ">
											{employeeBio &&
												employeeBio.map((items) => (
													<TableComponent
														id={items.id}
														name={
															items.surname + items.other_names
														}
														img={items.img}
														email={items.email}
														telephone={items.cellphone}
														date={items.created_at}
													/>
												))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default HomeDashboard;
