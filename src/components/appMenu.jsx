import { Menu } from "antd";

import { useNavigate } from "react-router-dom";

function AppMenu() {
	const navigate = useNavigate();

	const onMenuClick = (item) => {
		navigate(`/${item.key}`);
	};

	return (
		<div>
			<Menu
				className="border-none text-md md:text-base rounded-md md:rounded-none bg-slate-900 text-white"
				mode="horizontal"
				onClick={onMenuClick}
				disabledOverflow={true}
				triggerSubMenuAction="hover"
				items={[
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
				]}
			/>
		</div>
	);
}

export default AppMenu;
