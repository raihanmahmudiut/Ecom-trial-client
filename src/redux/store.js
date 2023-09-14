import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/products";
import cartReducer from "./slice/cart"; // Import the cart reducer

export const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer, // Include the cart reducer
	},
});
