import { UserAddOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserLogReg() {
	const navigate = useNavigate();

	const onUserClick = () => {
		navigate(`/login`);
	};
	return (
		<div
			onClick={() => {
				onUserClick();
			}}
		>
			<UserAddOutlined className=" text-lg md:text-xl cursor-pointer" />
		</div>
	);
}

export default UserLogReg;
