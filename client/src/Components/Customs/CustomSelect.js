import React from "react";

const CustomSelect = ({
	value,
	selectName,
	handleChange,
	disabled,
	id,
	children,
}) => {
	return (
		<select
			value={value}
			name={selectName}
			onChange={handleChange}
			disabled={disabled}
			id={id}
			className="w-full border rounded-md border-gray-400 h-11 outline-black px-4"
		>
			{children}
		</select>
	);
};

export default CustomSelect;
