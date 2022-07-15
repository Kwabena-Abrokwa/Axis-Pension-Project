import mysql from "mysql";
import bcrypt from "bcryptjs";

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "axis-project",
});

export const createEmployeeBio = async (req, res) => {
	const staff_no = Math.floor(200);
	const title = req.body.title;
	const surname = req.body.surname;
	const other_name = req.body.other_name;
	const email = req.body.email;
	const telephone = req.body.telephone;
	const img = req.file?.filename;
	const tin = req.body.tin;
	const SSNIT_no = req.body.SSNIT_no;
	const dob = req.body.dob;
	const gender = req.body.gender;
	const maritial_status = req.body.tin;
	const address = req.body.SSNIT_no;
	const appointment_date = req.body.appointment_date;

	db.query(
		"INSERT INTO employee(staff_no, other_names, surname, appointment_start_date, tin, SSNIT_no, dob, title, gender, marital_status_code, cellphone, email, address, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			staff_no,
			other_name,
			surname,
			appointment_date,
			tin,
			SSNIT_no,
			dob,
			title,
			gender,
			maritial_status,
			telephone,
			email,
			address,
			img,
		],
		(err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Employee bio creation failed",
				});
			}

			if (result) {
				return res.status(200).json({
					success: true,
					message: "Employee bio uploaded successfully",
				});
			}
		}
	);
};

export const getAllEmployees = async (req, res) => {
	db.query("SELECT * FROM employee", (err, result) => {
		if (err) {
			console.log(err);
			return res.status(400).json({
				success: false,
				message: "Something went wrong",
			});
		}
		if (result.length > 0) {
			return res.status(200).json(result);
		}
	});
};

export const getSingleEmployee = async (req, res) => {
	const id = req.params.id;

	db.query("SELECT * FROM employee WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(400).json({
				success: false,
				message: "Something went wrong",
			});
		}
		if (result.length > 0) {
			return res.status(200).json(result);
		}
	});
};

export const getAppointmentDetails = async (req, res) => {
	const id = req.params.id;

	db.query(
		"SELECT * FROM employee_appointment WHERE employee_id = ?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Something went wrong",
				});
			}
			if (result.length > 0) {
				return res.status(200).json(result);
			}
		}
	);
};

export const createEmployeeAppointmentDetails = async (req, res) => {
	const employee_id = req.body.employee_id;
	const designation = req.body.designation;
	const job_grade = req.body.job_grade;
	const employee_type = req.body.employee_type;
	const branch = req.body.branch;
	const hod_name = req.body.hod_name;
	const cfo = req.body.cfo;
	const contract_duration = req.body.contract_duration;
	db.query(
		"INSERT INTO employee_appointment(employee_id, designation, job_grade, employee_type, branch, hod_name, cfo, contract_duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		[
			employee_id,
			designation,
			job_grade,
			employee_type,
			branch,
			hod_name,
			cfo,
			contract_duration,
		],
		(err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Employment details creation failed",
				});
			}

			if (result) {
				return res.status(200).json({
					success: true,
					message: "Employment details uploaded successfully",
				});
			}
		}
	);
};
