import { HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AppLogo() {
	const navigate = useNavigate();

	const onHomeClick = () => {
		navigate("/");
	};

	return (
		<div className="bg-slate-900 text-white">
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
