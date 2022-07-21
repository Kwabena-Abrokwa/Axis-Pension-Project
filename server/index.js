import express from "express";
import cors from "cors";
import AdminRouter from "./Routes/AdminRoutes.js";
import multer from "multer"
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());
//env file configuration
dotenv.config();

//This route just confirms whether the server is running or not
app.get("/", (req, res) => {
	res.send("Server is running");
});

//This routes are for admins
app.use("/api/admin", AdminRouter);

//error handler
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError) {
		res.status(400).send({ success: false, message: "Bad Request" });
	} else if (err instanceof multer.MulterError) {
		if (err.code === "LIMIT_FILE_SIZE") {
			res.status(400).send({
				message: "File too large",
			});
		}
		if (err.code === "LIMIT_FIELD_COUNT") {
			res.status(400).send({
				message: "You can not upload more than one file",
			});
		}

		if (err.code === "LIMIT_UNEXPECTED_FILE") {
			res.status(400).send({
				message: "File should be an image",
			});
		}
	}
});

//The application is running on port 8081
const Port = 8081;

app.listen(Port, () => {
	console.log(`Server runnning on ${Port}`);
});
