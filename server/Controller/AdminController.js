import mysql from "mysql";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "axis-project",
});


export const createAnAdmin = async (req, res) => {
	const admin_name = req.body.admin_name;
	const password = req.body.password;

	let salt = bcrypt.genSaltSync(10);

	bcrypt.hash(password, salt, (err, hash) => {
		if (err) {
			console.log(err);
		}

		db.query(
			"INSERT INTO admin(admin_name, password) VALUES (?, ?)",
			[admin_name, hash],
			(err, result) => {
				if (err) {
					console.log(err);
				} else {
					res.send("Success");
				}
			}
		);
	});
};


export const loginAdmin = async (req, res) => {
	const admin_name = req.body.admin_name;
	const password = req.body.password;

	db.query(
		"SELECT * FROM admin WHERE admin_name = ?",
		admin_name,
		(err, result) => {
			if (err) {
				console.log(err);
			}
			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (err, response) => {
					if (err) {
						console.log(err);
					}
					if (response) {
						const admin_Id = result[0].admin_Id;
						const name = result[0].admin_name;
						const token = Jwt.sign(
							{ admin_Id, name },
							"1244553345Ggfs$",
							{ expiresIn: 300 }
						);

						res.status(200).json({
							auth: 1,
							token: token,
							admin_name: admin_name,
						});
					} else {
						res.json({
							auth: 0,
							message: "Id / Password does not match",
						});
					}
				});
			} else {
				res.json({ auth: 0, message: "No user found" });
			}
		}
	);
};
