import {
	LoginOutlined,
	LogoutOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
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
			className="bg-gradient-to-r from-teal-300 to-indigo-400 rounded-2xl w-auto md:w-24 h-8 text-xl flex justify-center items-center text-black font-bold"
			onClick={onUserClick}
		>
			<button>
				{isLoggedIn ? (
					<div className="flex flex-row gap-2 px-2 ">
						<LogoutOutlined /> <p className="hidden md:block">Sign out</p>
					</div>
				) : (
					<div className="flex flex-row gap-2 px-2 ">
						<LoginOutlined />
						<p className="hidden md:block">Sign in</p>
					</div>
				)}
			</button>
		</div>
	);
}

export default UserLogReg;
