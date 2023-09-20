import { HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AppLogo() {
	const navigate = useNavigate();

	const onHomeClick = () => {
		navigate("/");
	};

	return (
		<div className=" text-white">
			<HomeFilled
				className="text-lg md:text-xl cursor-pointer"
				onClick={() => {
					onHomeClick();
				}}
			/>
		</div>
	);
}

export default AppLogo;
