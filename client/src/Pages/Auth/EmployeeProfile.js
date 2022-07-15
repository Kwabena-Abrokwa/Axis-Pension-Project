import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layout/DashboardLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import { MdClose } from "react-icons/md";
import CustomSelect from "../../Components/Customs/CustomSelect";

const EmployeeProfile = () => {
	const { id } = useParams();

	const [data, setdata] = useState({
		employee_id: id,
		designation: "CEO",
		job_grade: "Executive Director",
		employee_type: "Permanent",
		branch: "",
		hod_name: "",
		cfo: "",
		contract_duration: "",
	});

	const [color, setcolor] = useState("red");

	const [employeeBio, setEmployeeBio] = useState([]);

	const [loader, setloader] = useState(false);

	const [modalHandler, setModalHandler] = useState(false);

	const [message, setmessage] = useState("");

	const handleModal = () => {
		setModalHandler(!modalHandler);
	};

	const [appointmentDetails, setAppointmentDetails] = useState([]);

	const handleChange = (event) => {
		setdata({
			...data,
			[event.target.name]: event.target.value,
		});
		setmessage("");
		console.log(data);
	};

	//get all employees here
	const getSingleEmployee = async () => {
		await axios
			.get(`http://localhost:8081/api/admin/getSingleEmployee/${id}`)
			.then(({ data }) => {
				if (data.success === false) {
					return null;
				}
				setEmployeeBio(data);
				console.log(data);
			})
			.catch((err) => {
				return null;
			});
	};

	const getAppointmentDetails = async () => {
		await axios
			.get(`http://localhost:8081/api/admin/getAppointmentDetails/${id}`)
			.then(({ data }) => {
				if (data.success === false) {
					return null;
				}

				setAppointmentDetails(data);
				console.log(data);
			})
			.catch((err) => {
				return null;
			});
	};

	useEffect(() => {
		getSingleEmployee();
		getAppointmentDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setloader(true);

		if (
			data.branch === "" ||
			data.hod_name === "" ||
			data.cfo === "" ||
			data.contract_duration === ""
		) {
			setmessage("All field are required");
			return null;
		}
		axios
			.post(
				"http://localhost:8081/api/admin/createEmployeeEmploymentDetails",
				data
			)
			.then(({ data }) => {
				if (data.success === true) {
					setcolor("green");
					setmessage(data.message);
					setloader(false);
					getAppointmentDetails();
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
								Fill forms to add employee employment details.
							</h2>
							<h3 className="text-lg font-light py-3">
								Employee Employment Details
							</h3>
							<div className="mb-8">
								<label className="text-md font-semibold">
									Designation
								</label>
								<CustomSelect
									selectName={"designation"}
									value={data.designation}
									handleChange={handleChange}
								>
									<option value={"CEO"}>CEO</option>
									<option value={"Head of HR"}>Head of HR</option>
									<option value={"Chief Finance Officer"}>
										Chief Finance Officer
									</option>
									<option value={"Sales Representative"}>
										Sales Representative
									</option>
									<option value={"IT Officer"}>IT Officer</option>
									<option value={"Accountant"}>Accountant</option>
									<option value={"Marketing Officer"}>
										Marketing Officer
									</option>
								</CustomSelect>
							</div>
							<div className="mb-8">
								<label className="text-md font-semibold">
									Designation
								</label>
								<CustomSelect
									selectName={"job_grade"}
									value={data.job_grade}
									handleChange={handleChange}
								>
									<option value={"Executive Director"}>
										Executive Director
									</option>
									<option value={"Senior Manager"}>
										Senior Manager
									</option>
									<option value={"Manger"}>Manger</option>
									<option value={"Junior Manger"}>
										Junior Manger
									</option>
									<option value={"Junior Staff"}>Junior Staff</option>
								</CustomSelect>
							</div>
							<div className="mb-8">
								<label className="text-md font-semibold">
									Designation
								</label>
								<CustomSelect
									selectName={"employee_type"}
									value={data.employee_type}
									handleChange={handleChange}
								>
									<option value={"Permanent"}>Permanent</option>
									<option value={"Contract"}>Contract</option>
								</CustomSelect>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">Branch</label>
								<CustomInput
									type={"text"}
									value={data.branch}
									name={"branch"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									Head Of Department Name
								</label>
								<CustomInput
									type={"text"}
									value={data.hod_name}
									name={"hod_name"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									Contract Frequency Code
								</label>
								<CustomInput
									type={"text"}
									value={data.cfo}
									name={"cfo"}
									handleChange={handleChange}
								/>
							</div>
							<div className="my-8">
								<label className="text-md font-semibold">
									Contract Duration
								</label>
								<CustomInput
									type={"text"}
									value={data.contract_duration}
									name={"contract_duration"}
									handleChange={handleChange}
								/>
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
								{loader ? "Please wait..." : "Add Employment Player"}
							</CustomButton>
						</div>
					</form>
				</div>
			) : null}

			<section className="w-11/12 mx-auto mt-4">
				<h1 className="text-4xl my-10">Employee Bio</h1>
				{employeeBio &&
					employeeBio.map((items) => (
						<div
							className="flex justify-between items-end"
							key={items.id}
						>
							<div className="profile">
								<img
									src={items.img}
									alt="Employee Profile"
									className="w-80 h-80 rounded-full"
								/>
								<h3>{`Name: ${items.title} ${items.surname} ${items.other_names}`}</h3>
								<h3>{`Gender: ${items.gender}`}</h3>
								<h3>{`Date of Birth: ${items.dob}`}</h3>
							</div>
							<div>
								<h3>{`Maritial Status: ${items.marital_status_code}`}</h3>
								<h3>{`Address: ${items.address}`}</h3>
								<h3>{`Telephone: ${items.cellphone}`}</h3>
								<h3>{`Email: ${items.email}`}</h3>
							</div>
							<div>
								<h3>{`TIN Number: ${items.tin}`}</h3>
								<h3>{`Staff Number: ${items.staff_no}`}</h3>
								<h3>{`Appointment Date: ${items.appointment_start_date}`}</h3>
								<h3>{`SSNIT Number: ${items.SSNIT_no}`}</h3>
							</div>
						</div>
					))}
				<h1 className="text-4xl my-20">Employee Employment Information</h1>
				{appointmentDetails.length < 1 ? (
					<h3 className="text-xl text-center">
						No appointment details found
						<div className="w-3/6 mx-auto my-16">
							<CustomButton onclick={handleModal}>
								Add employment details
							</CustomButton>
						</div>
					</h3>
				) : (
					appointmentDetails.map((items) => (
						<div
							className="flex justify-between items-end mb-40"
							key={items.id}
						>
							<div className="profile">
								<h3>{`Designation: ${items.designation}`}</h3>
								<h3>{`Job Grade: ${items.job_grade}`}</h3>
								<h3>{`Employee Type: ${items.employee_type}`}</h3>
							</div>
							<div>
								<h3>{`Branch: ${items.branch}`}</h3>
								<h3>{`Head of Department Name: ${items.hod_name}`}</h3>
								<h3>{`Contract Frequency Code: ${items.cfo}`}</h3>
								<h3>{`Contract Duration: ${items.contract_duration}`}</h3>
							</div>
						</div>
					))
				)}
				<div></div>
			</section>
		</DashboardLayout>
	);
};

export default EmployeeProfile;
