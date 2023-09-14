import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		data: {}, // Initialize data as an empty object
	},
	reducers: {
		addToCart: (state, action) => {
			const itemId = action.payload;
			state.data[itemId] = (state.data[itemId] || 0) + 1;
		},
		removeFromCart: (state, action) => {
			const itemId = action.payload;
			if (state.data[itemId] > 0) {
				state.data[itemId] -= 1;
			}
		},
		updateCartItemCount: (state, action) => {
			const { itemId, newAmount } = action.payload;
			if (newAmount >= 0) {
				state.data[itemId] = newAmount;
			}
		},
	},
});

export const { addToCart, removeFromCart, updateCartItemCount } =
	cartSlice.actions;
export default cartSlice.reducer;
