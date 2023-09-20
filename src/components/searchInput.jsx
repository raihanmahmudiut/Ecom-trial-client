import React from "react";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

function SearchInput({ onSearch }) {
	const handleSearch = (value) => {
		onSearch(value);
	};

	return (
		<div className=" flex item-center justify-center">
			<Search
				placeholder="Search products..."
				enterButton
				allowClear
				suffix={<AudioOutlined />}
				onSearch={handleSearch}
				className=" w-48 md:w-72"
			/>
		</div>
	);
}

export default SearchInput;
