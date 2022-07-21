import Joi from "joi";

export const createEmployeeBioValidation = (data) => {
	const employeeBioValidationScheme = Joi.object({
		title: Joi.string().required(),
		surname: Joi.string().required(),
		other_name: Joi.string().required(),
		email: Joi.string().email().required(),
		telephone: Joi.string().required(),
		tin: Joi.string().required(),
		SSNIT_no: Joi.string().required(),
		dob: Joi.date().required(),
		gender: Joi.string().required(),
		maritial_status: Joi.string().required(),
		address: Joi.string().required(),
		appointment_date: Joi.date().required(),
		img: Joi.allow("")
	});

	return employeeBioValidationScheme.validate(data);
};

export const createEmployeeAppointmentDetailsValidation = (data) => {
	const employeeAppointmentDetails = Joi.object({
		employee_id: Joi.string().required(),
		designation: Joi.string().required(),
		job_grade: Joi.string().required(),
		employee_type: Joi.string().required(),
		branch: Joi.string().required(),
		hod_name: Joi.string().required(),
		cfo: Joi.string().required(),
		contract_duration: Joi.string().required(),
	});

	return employeeAppointmentDetails.validate(data);
};
