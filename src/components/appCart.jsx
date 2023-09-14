import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
	Badge,
	Drawer,
	List,
	InputNumber,
	Button,
	Typography,
	Card,
} from "antd";

import { removeFromCart, updateCartItemCount } from "../redux/slice/cart";

function AppCart() {
	const cart = useSelector((state) => state.cart.data);
	const products = useSelector((state) => state.products.data);
	const dispatch = useDispatch();
	const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

	const handleRemoveFromCart = (itemId) => {
		dispatch(removeFromCart(itemId));
	};

	const handleUpdateItemCount = (newAmount, itemId) => {
		dispatch(updateCartItemCount({ itemId, newAmount }));

		// Calculate the total price for this product
		const productInfo = products.products.find(
			(product) => product.id === Number(itemId)
		);

		if (productInfo && productInfo.price) {
			const totalPrice = newAmount * parseFloat(productInfo.price);

			// You can store this total price in the Redux store if needed
			// or use it directly in your component
			console.log(`Total Price for item ${itemId}: $${totalPrice}`);
		}
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;

		if (products && cart) {
			for (const itemId in cart) {
				if (cart[itemId] > 0) {
					const itemInfo = products.products.find(
						(product) => product.id === Number(itemId)
					);
					if (itemInfo && itemInfo.price) {
						totalAmount += cart[itemId] * parseInt(itemInfo.price);
					}
				}
			}
		}

		return totalAmount;
	};

	const getTotalCartQuantity = () => {
		let totalQuantity = 0;

		if (cart) {
			for (const itemId in cart) {
				if (cart[itemId] > 0) {
					totalQuantity += cart[itemId];
				}
			}
		}

		return totalQuantity;
	};

	return (
		<div>
			<Badge
				count={getTotalCartQuantity()}
				onClick={() => setCartDrawerOpen(true)}
			>
				<ShoppingCartOutlined className="text-lg md:text-3xl cursor-pointer" />
			</Badge>
			<Drawer
				maskClosable
				open={cartDrawerOpen}
				onClose={() => setCartDrawerOpen(false)}
				zIndex={1000}
				height={500}
				width={500}
			>
				{Object.keys(cart).length > 0 ? (
					<List
						itemLayout="horizontal"
						dataSource={Object.keys(cart)}
						renderItem={(itemId) => {
							const productInfo = products.products.find(
								(product) => product.id === Number(itemId)
							);

							if (!productInfo) {
								return null; // Skip rendering if productInfo is not found
							}

							return (
								<List.Item key={itemId}>
									<Card style={{ width: "100%" }}>
										<div style={{ display: "flex", height: "80px" }}>
											{/* Image Div (on the left) */}
											<div>
												<img
													src="/assets/image-placeholder-500x500 (1).jpg"
													alt={productInfo.title}
													style={{
														width: "80px",
														height: "80px",
														borderRadius: "12%",
													}}
												/>
											</div>

											{/* Title and Price Div (on the right) */}

											<div
												style={{
													marginLeft: "8px",
													marginTop: "0",
													marginBottom: "0",
													display: "flex",
													flexDirection: "column",
													justifyContent: "space-between",
													flex: 1,
												}}
											>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
													}}
												>
													<div
														style={{
															flex: 1,
														}}
													>
														<h3 style={{ marginTop: "0", paddingTop: "0" }}>
															{productInfo.title}
														</h3>
													</div>
													<div
														style={{
															flex: 1,
															textAlign: "right",
														}}
													>
														<p style={{ marginTop: "0", paddingTop: "0" }}>
															Total Price: $
															{cart[itemId] * parseFloat(productInfo.price)}
														</p>
													</div>
												</div>
												{/* Remove Button and Input Div */}
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
													}}
												>
													<div>
														<InputNumber
															min={1}
															value={cart ? cart[itemId] : 0}
															onChange={(value) =>
																handleUpdateItemCount(value, itemId)
															}
														/>
													</div>
													<div>
														<Button
															type="danger"
															onClick={() => handleRemoveFromCart(itemId)}
														>
															Remove
														</Button>
													</div>
												</div>
											</div>
										</div>
									</Card>
								</List.Item>
							);
						}}
					/>
				) : (
					<Typography.Text>Cart is empty</Typography.Text>
				)}

				{/* "Proceed to checkout" button */}
				{getTotalCartQuantity() > 0 && (
					<div style={{ textAlign: "center", marginTop: "16px" }}>
						<Button type="secondary">Proceed to checkout</Button>
					</div>
				)}
			</Drawer>
		</div>
	);
}

export default AppCart;
