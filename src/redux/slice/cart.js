import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		data: {},
	},
	reducers: {
		addToCart: (state, action) => {
			const itemId = action.payload;
			state.data[itemId] = (state.data[itemId] || 0) + 1;
		},
		removeFromCart: (state, action) => {
			const itemId = action.payload;
			if (itemId in state.data) {
				delete state.data[itemId];
			}
		},
		updateCartItemCount: (state, action) => {
			const { itemId, newAmount } = action.payload;
			if (newAmount >= 0) {
				state.data[itemId] = newAmount;
				if (newAmount === 0) {
					delete state.data[itemId];
				}
			}
		},
	},
});

export const { addToCart, removeFromCart, updateCartItemCount } =
	cartSlice.actions;
export default cartSlice.reducer;
