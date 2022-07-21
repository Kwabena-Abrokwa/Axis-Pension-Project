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
import AdminMiddleware from "../Middlewares/AdminMiddleware.js";

const storage = multer.diskStorage({
	destination: "../../client/src/Assets/Employees",
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
router.get("/getAllEmployees", AdminMiddleware, getAllEmployees);

router.get("/getSingleEmployee/:id", AdminMiddleware, getSingleEmployee);

//This routes helps to create employees bio
router.post(
	"/createEmployeeBio",
	AdminMiddleware,
	upload.single("img"),
	createEmployeeBio
);

//This routes helps to add employees appointment details
router.post(
	"/createEmployeeEmploymentDetails",
	AdminMiddleware,
	createEmployeeAppointmentDetails
);
router.get(
	"/getAppointmentDetails/:id",
	AdminMiddleware,
	getAppointmentDetails
);

//This routes helps to authenticate admins before they login
router.post("/loginAdmin", loginAdmin);

export default router;
