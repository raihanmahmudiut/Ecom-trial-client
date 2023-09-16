import { Routes, Route } from "react-router-dom";
import Category from "../Pages/Category/category";
import Home from "../Pages/Home/home";
import LoginRegistraion from "../Pages/UserLogin/LogReg";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/:categoryId" element={<Category />}></Route>
			<Route path="/login" element={<LoginRegistraion />}></Route>
		</Routes>
	);
}

export default AppRoutes;
