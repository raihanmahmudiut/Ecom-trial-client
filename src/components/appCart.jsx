import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ArrowRightOutlined,
	DeleteFilled,
	MinusOutlined,
	PlusOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, List, Typography, Card } from "antd";

import {
	addToCart,
	removeFromCart,
	updateCartItemCount,
} from "../redux/slice/cart";

function AppCart() {
	const cart = useSelector((state) => state.cart.data);
	const products = useSelector((state) => state.products.data);
	const dispatch = useDispatch();
	const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

	const handleRemoveFromCart = (itemId) => {
		dispatch(removeFromCart(itemId));
	};

	const handleUpdateItemCount = (itemId, action) => {
		if (action === "increment") {
			dispatch(addToCart(itemId)); // Increment the quantity
		} else if (action === "decrement" && cart[itemId] > 1) {
			dispatch(updateCartItemCount({ itemId, newAmount: cart[itemId] - 1 })); // Decrement the quantity
		} else if (action === "decrement" && cart[itemId] === 1) {
			dispatch(removeFromCart(itemId)); // Remove the item from the cart if the quantity is 1
		}
	};

	const getCartItemTotal = (itemId) => {
		const productInfo = products.products.find(
			(product) => product.id === Number(itemId)
		);

		if (productInfo && productInfo.price) {
			return cart[itemId] * parseFloat(productInfo.price);
		}

		return 0;
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;

		if (products && cart) {
			for (const itemId in cart) {
				if (cart[itemId] > 0) {
					totalAmount += getCartItemTotal(itemId);
				}
			}
		}

		return totalAmount.toFixed(2); // Ensure the total amount is formatted with two decimal places.
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
				<ShoppingCartOutlined className="text-lg text-white md:text-3xl cursor-pointer" />
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
														<h3 className=" mt-0 pt-0 font-semibold">
															{productInfo.title}
														</h3>
													</div>
													<div
														style={{
															flex: 1,
															textAlign: "right",
														}}
													>
														<p className=" mt-0 pt-0 font-semibold">
															Total: ${getCartItemTotal(itemId).toFixed(2)}
														</p>
													</div>
												</div>
												{/* Remove Button and Input Div */}
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
													}}
												>
													<div className="flex flex-row w-2/5 md:w-1/4 justify-between py-2">
														<div className="cursor-pointer border-slate-200 border-2 rounded-md px-1 hover:opacity-60 transition-opacity duration-[0.3s] ">
															{/* Replace the custom minus icon with Ant Design MinusOutlined */}
															<MinusOutlined
																onClick={() =>
																	handleUpdateItemCount(itemId, "decrement")
																}
															/>
														</div>

														<p className="text-black font-bold text-sm text-center">
															{cart[itemId]}
														</p>
														<div className="cursor-pointer border-slate-200 border-2 rounded-md px-1 hover:opacity-60 transition-opacity duration-[0.3s] ">
															{/* Replace the custom plus icon with Ant Design PlusOutlined */}
															<PlusOutlined
																onClick={() =>
																	handleUpdateItemCount(itemId, "increment")
																}
															/>
														</div>
													</div>
													<div>
														<button
															className="cursor-pointer bg-slate-800 hover:bg-opacity-90 text-white rounded-md px-1 md:px-2 md:py-1  flex flex-row gap-1 items-center"
															onClick={() => handleRemoveFromCart(itemId)}
														>
															<DeleteFilled className="md:text-xl" />{" "}
															<p className="font-semibold">Remove</p>
														</button>
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

				{/* Subtotal */}
				{getTotalCartQuantity() > 0 && (
					<div className="text-center">
						<p className="font-semibold">Subtotal: ${getTotalCartAmount()}</p>
						<button className=" bg-slate-800 text-white font-semibold px-8 py-2 items-center hover:bg-opacity-90 rounded-md self-center text-center mt-3">
							Proceed to checkout{" "}
							<ArrowRightOutlined className="font-semibold" />
						</button>
					</div>
				)}
			</Drawer>
		</div>
	);
}

export default AppCart;
