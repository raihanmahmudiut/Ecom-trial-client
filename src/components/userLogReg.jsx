import { UserAddOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/user"; // Import your logout action

function UserLogReg() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Get the isLoggedIn state from Redux
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const onUserClick = () => {
		if (isLoggedIn) {
			// If the user is logged in, perform logout
			dispatch(logout());
		} else {
			// If the user is not logged in, navigate to the login page
			navigate(`/login`);
		}
	};

	return (
		<div
			className="bg-gradient-to-r from-teal-300 to-indigo-400 rounded-2xl w-20 h-8 flex justify-center items-center text-black font-bold"
			onClick={onUserClick}
		>
			<button>{isLoggedIn ? "Sign out" : "Sign in"}</button>
		</div>
	);
}

export default UserLogReg;
