import { HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AppLogo() {
	const navigate = useNavigate();

	const onHomeClick = () => {
		navigate("/");
	};

	return (
		<div>
			<HomeFilled
				className="text-lg md:text-3xl cursor-pointer"
				onClick={() => {
					onHomeClick();
				}}
			/>
		</div>
	);
}

export default AppLogo;
