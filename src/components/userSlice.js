// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		isLoggedIn: false,
		// Add more user-related data as needed (e.g., username, email, etc.)
	},
	reducers: {
		login: (state) => {
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			// Clear any other user-related data if needed
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
