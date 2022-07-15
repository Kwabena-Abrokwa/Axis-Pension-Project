import React from "react";

const CustomInput = ({ type, value, name, handleChange, disabled, id }) => {
	return (
		<>
			<input
				type={type}
				value={value}
				name={name}
				onChange={handleChange}
				disabled={disabled}
				id={id}
				className="w-full border rounded-md border-gray-400 h-11 outline-black px-4"
			/>
		</>
	);
};

export default CustomInput;
