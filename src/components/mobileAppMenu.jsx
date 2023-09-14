import React, { useState } from "react";
import { Menu } from "antd";
import { HomeFilled, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function MobileAppMenu() {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(true);

	const toggleMenu = () => {
		setCollapsed(!collapsed);
	};

	const onMenuClick = (item) => {
		navigate(`/${item.key}`);
	};

	return (
		<div className={`menu-wrapper ${collapsed ? "collapsed" : ""}`}>
			<Menu
				className="border-none"
				mode="vertical"
				onClick={onMenuClick}
				disabledOverflow={true}
				triggerSubMenuAction="hover"
				items={[
					{
						label: <HomeFilled />,
						key: "",
					},
					{
						label: "Men",
						key: "men",
						children: [
							{
								label: "Men's Shirts",
								key: "mens-shirts",
							},
							{
								label: "Men's Shoes",
								key: "mens-shoes",
							},
							{
								label: "Men's Watches",
								key: "mens-watches",
							},
						],
					},
					{
						label: "Women",
						key: "women",
						children: [
							{
								label: "Women's Dresses",
								key: "womens-dresses",
							},
							{
								label: "Women's Shoes",
								key: "womens-shoes",
							},
							{
								label: "Women's Watches",
								key: "womens-watches",
							},
							{
								label: "Women's Bags",
								key: "womens-bags",
							},
							{
								label: "Women's Jewellery",
								key: "womens-jewellery",
							},
						],
					},
					{
						label: "Smartphones",
						key: "smartphones",
					},
					{
						label: "Fragrances",
						key: "fragrances",
					},
				]}
			/>
		</div>
	);
}

export default MobileAppMenu;
