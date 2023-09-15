// wishlistSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: {}, // You can use an object to store wishlist items with their IDs as keys
};

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		addToWishlist: (state, action) => {
			const itemId = action.payload;
			state.data[itemId] = true; // Add the item to the wishlist
		},
		removeFromWishlist: (state, action) => {
			const itemId = action.payload;
			delete state.data[itemId]; // Remove the item from the wishlist
		},
		toggleWishlist: (state, action) => {
			const itemId = action.payload;
			if (state.data[itemId]) {
				delete state.data[itemId]; // If the item is in the wishlist, remove it
			} else {
				state.data[itemId] = true; // If the item is not in the wishlist, add it
			}
		},
	},
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
	wishlistSlice.actions;

export default wishlistSlice.reducer;
