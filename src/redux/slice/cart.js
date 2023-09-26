import { createSlice } from "@reduxjs/toolkit";

// Helper function to retrieve cart data from localStorage
const getCartDataFromLocalStorage = () => {
	try {
		const data = localStorage.getItem("data");
		return data ? JSON.parse(data) : {};
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
			// Update localStorage
			localStorage.setItem("data", JSON.stringify(state.data));
		},
		removeFromCart: (state, action) => {
			const itemId = action.payload;
			if (itemId in state.data) {
				delete state.data[itemId];
				// Update localStorage
				localStorage.setItem("data", JSON.stringify(state.data));
			}
		},
		updateCartItemCount: (state, action) => {
			const { itemId, newAmount } = action.payload;
			if (newAmount >= 0) {
				state.data[itemId] = newAmount;
				if (newAmount === 0) {
					delete state.data[itemId];
				}
				// Update localStorage
				localStorage.setItem("data", JSON.stringify(state.data));
			}
		},
	},
});

export const { addToCart, removeFromCart, updateCartItemCount } =
	cartSlice.actions;
export default cartSlice.reducer;
