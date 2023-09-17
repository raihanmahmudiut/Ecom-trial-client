import { Dropdown, Space, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const items = [
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
		style: { marginRight: "2px" },
	},
	{
		label: "Fragrances",
		key: "fragrances",
	},
];

function AppMenu() {
	const navigate = useNavigate();

	const onMenuClick = (item) => {
		navigate(`/${item.key}`);
	};

	const menu = (
		<Menu>
			{items.map((item) => {
				if (item.children) {
					return (
						<Menu.SubMenu key={item.key} title={item.label}>
							{item.children.map((child) => (
								<Menu.Item key={child.key} onClick={() => onMenuClick(child)}>
									{child.label}
								</Menu.Item>
							))}
						</Menu.SubMenu>
					);
				} else {
					return (
						<Menu.Item key={item.key} onClick={() => onMenuClick(item)}>
							{item.label}
						</Menu.Item>
					);
				}
			})}
		</Menu>
	);

	return (
		<Dropdown overlay={menu}>
			<a onClick={(e) => e.preventDefault()}>
				<Space>
					<MenuOutlined className="text-white text-xl" />
				</Space>
			</a>
		</Dropdown>
	);
}

export default AppMenu;
