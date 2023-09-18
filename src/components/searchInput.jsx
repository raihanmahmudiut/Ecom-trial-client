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
			/>
		</div>
	);
}

export default SearchInput;
