import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
	try {
		const response = await fetch("https://dummyjson.com/users");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
});

const userSlice = createSlice({
	name: "users",
	initialState: {
		isLoading: false,
		data: null,
		isError: false,
		errorMessage: "",
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
			state.errorMessage = "";
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
			state.isError = false;
			state.errorMessage = "";
		});
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.error.message || "An error occurred";
		});
	},
});

export default userSlice.reducer;
