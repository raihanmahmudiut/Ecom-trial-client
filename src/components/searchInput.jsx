import { useState } from "react";

function SearchInput({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = () => {
		onSearch(searchQuery);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search products"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<button onClick={handleSearch}>Search</button>
			<button onClick={() => setSearchQuery("")}>Clear</button>
		</div>
	);
}

export default SearchInput;
