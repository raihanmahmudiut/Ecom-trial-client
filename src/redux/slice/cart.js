import { createSlice } from "@reduxjs/toolkit";

const getCartDataFromLocalStorage = () => {
	try {
		const cartData = localStorage.getItem("cartData"); // Change the key here
		return cartData ? JSON.parse(cartData) : {};
	} catch (error) {
		console.error("Error loading cart data from localStorage:", error);
		return {};
	}
};

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		data: getCartDataFromLocalStorage(),
	},
	reducers: {
		addToCart: (state, action) => {
			const itemId = action.payload;
			state.data[itemId] = (state.data[itemId] || 0) + 1;
			localStorage.setItem("cartData", JSON.stringify(state.data)); // Change the key here
		},
		removeFromCart: (state, action) => {
			const itemId = action.payload;
			if (itemId in state.data) {
				delete state.data[itemId];
				localStorage.setItem("cartData", JSON.stringify(state.data)); // Change the key here
			}
		},
		updateCartItemCount: (state, action) => {
			const { itemId, newAmount } = action.payload;
			if (newAmount >= 0) {
				state.data[itemId] = newAmount;
				if (newAmount === 0) {
					delete state.data[itemId];
				}
				localStorage.setItem("cartData", JSON.stringify(state.data)); // Change the key here
			}
		},
	},
});

export const { addToCart, removeFromCart, updateCartItemCount } =
	cartSlice.actions;

export default cartSlice.reducer;
