import React from "react";
import { Link } from "react-router-dom";

const TableComponent = ({ id, img, name, email, telephone, date }) => {
	return (
		<>
			<tr className="hover:bg-gray-100 dark:hover:bg-gray-200">
				<td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap">
					<Link to={`/employee-profile/${id}`}>{id}</Link>
				</td>
				<td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap ">
					<Link to={`/employee-profile/${id}`}>
						<img
							src={img}
							alt="Employee Profile"
							className="w-16 h-16 rounded-full"
						/>
					</Link>
				</td>
				<td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap">
					<Link to={`/employee-profile/${id}`}>{name}</Link>
				</td>
				<td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap">
					<Link to={`/employee-profile/${id}`}>{email}</Link>
				</td>
				<td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap">
					<Link to={`/employee-profile/${id}`}>{telephone}</Link>
				</td>
				<td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap">
					<Link to={`/employee-profile/${id}`}>{date}</Link>
				</td>
			</tr>
		</>
	);
};

export default TableComponent;
