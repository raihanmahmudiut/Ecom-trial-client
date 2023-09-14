import React from "react";
import { HomeFilled, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MobileAppMenu from "./mobileAppMenu";

function AppLogo({ toggleMenu }) {
	const navigate = useNavigate();

	const onHomeClick = () => {
		navigate("/");
	};

	return (
		<div>
			<div className="flex items-center gap-3 ">
				<MenuOutlined
					className="text-lg md:text-3xl cursor-pointer sm:hidden"
					onClick={toggleMenu}
				/>
				<HomeFilled
					className="text-lg md:text-3xl cursor-pointer"
					onClick={() => {
						onHomeClick();
					}}
				/>
			</div>
		</div>
	);
}

export default AppLogo;
