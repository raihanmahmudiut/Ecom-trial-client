import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
	name: "wish",
	initialState: {
		data: {}, // Initialize data as an empty object
	},
	reducers: {
		addToWishlist: (state, action) => {
			const itemId = action.payload;
			state.data[itemId] = true; // You can use a boolean to indicate whether an item is in the wishlist or not.
		},
		removeFromWishlist: (state, action) => {
			const itemId = action.payload;
			delete state.data[itemId]; // Remove the item from the wishlist.
		},
	},
});

export const { addToWishlist, removeFromWishlist } = wishSlice.actions;
export default wishSlice.reducer;
