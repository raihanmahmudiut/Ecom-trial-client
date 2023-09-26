import { createSlice } from "@reduxjs/toolkit";
const getWishFromLocalStorage = () => {
	try {
		const wishlistData = localStorage.getItem("wishlistData");
		if (wishlistData) {
			return JSON.parse(wishlistData);
		}
		return {};
	} catch (error) {
		console.error("Error loading wishlist data from localStorage:", error);
		console.log("Corrupted wishlist data:", wishlistData); // Log the problematic data
		// Optionally, you can clear the corrupted data from localStorage:
		// localStorage.removeItem("wishlistData");
		return {};
	}
};

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState: {
		data: getWishFromLocalStorage(),
	},
	reducers: {
		addToWishlist: (state, action) => {
			const itemId = action.payload;
			state.data[itemId] = true;
			localStorage.setItem("wishlistData", JSON.stringify(state.data)); // Change the key here
		},
		removeFromWishlist: (state, action) => {
			const itemId = action.payload;
			delete state.data[itemId];
			localStorage.setItem("wishlistData", JSON.stringify(state.data)); // Change the key here
		},
		toggleWishlist: (state, action) => {
			const itemId = action.payload;
			if (state.data[itemId]) {
				delete state.data[itemId];
			} else {
				state.data[itemId] = true;
			}
			localStorage.setItem("wishlistData", JSON.stringify(state.data)); // Change the key here
		},
	},
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
	wishlistSlice.actions;

export default wishlistSlice.reducer;
