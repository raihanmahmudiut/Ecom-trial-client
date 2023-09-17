import { Routes, Route } from "react-router-dom";
import Category from "../Pages/Category/category";
import Home from "../Pages/Home/home";
import LoginRegistraion from "../Pages/UserLogin/LogReg";
import ProductDetails from "./ProductDetails";

function AppRoutes(searchQuery) {
	return (
		<Routes>
			<Route path="/" element={<Home searchQuery={searchQuery} />}></Route>
			<Route
				path="/:categoryId"
				element={<Category searchQuery={searchQuery} />}
			></Route>
			<Route path="/login" element={<LoginRegistraion />}></Route>
			<Route path="/productdetails/:productId" element={<ProductDetails />} />
		</Routes>
	);
}

export default AppRoutes;
