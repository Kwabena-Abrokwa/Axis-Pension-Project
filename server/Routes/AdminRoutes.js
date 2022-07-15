import express from "express";
import multer from "multer";
import { createAnAdmin, loginAdmin } from "../Controller/AdminController.js";
import {
	createEmployeeAppointmentDetails,
	createEmployeeBio,
	getAllEmployees,
	getAppointmentDetails,
	getSingleEmployee,
} from "../Controller/EmployeesController.js";

const storage = multer.diskStorage({
	destination: "../candidates images",
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		return cb(null, uniqueSuffix + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png" ||
		file.mimetype === "image/webp"
	) {
		cb(null, true);
	} else {
		cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
});

const router = express.Router();

//This routes helps to create new admins
router.post("/createAdmin", createAnAdmin);

//This routes helps to create employees bio
router.get("/getAllEmployees", getAllEmployees);

router.get("/getSingleEmployee/:id", getSingleEmployee);

//This routes helps to create employees bio
router.post("/createEmployeeBio", upload.single("img"), createEmployeeBio);

//This routes helps to add employees appointment details
router.post(
	"/createEmployeeEmploymentDetails",
	createEmployeeAppointmentDetails
);
router.get("/getAppointmentDetails/:id", getAppointmentDetails);

//This routes helps to authenticate admins before they login
router.post("/loginAdmin", loginAdmin);

export default router;
