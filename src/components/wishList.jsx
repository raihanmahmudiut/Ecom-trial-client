import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteFilled, HeartOutlined, ShoppingFilled } from "@ant-design/icons";
import { Card, List, Typography, Drawer, Badge, message } from "antd";
import { addToCart } from "../redux/slice/cart";
import { removeFromWishlist } from "../redux/slice/wish";

function Wishlist() {
	const wishlist = useSelector((state) => state.wish.data);
	const products = useSelector((state) => state.products.data);
	const dispatch = useDispatch();
	const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);

	const handleAddToCart = (itemId) => {
		const productInfo = products.products.find(
			(product) => product.id === Number(itemId)
		);

		if (productInfo) {
			dispatch(addToCart(Number(itemId)));
			message.success(`"${productInfo.title}" added to cart`);
		} else {
			message.error("Product not found");
		}
	};

	const handleRemoveFromWishlist = (itemId) => {
		const productInfo = products.products.find(
			(product) => product.id === Number(itemId)
		);
		dispatch(removeFromWishlist(itemId));
		message.success(`"${productInfo.title}" removed from wishlist`);
	};

	const getWishlistItemCount = () => {
		return Object.keys(wishlist).length;
	};

	return (
		<div>
			<Badge
				count={getWishlistItemCount()}
				color="black"
				className="text-black"
			>
				<HeartOutlined
					className="text-lg text-white md:text-xl cursor-pointer"
					onClick={() => setWishlistDrawerOpen(true)}
				/>
			</Badge>
			<Drawer
				maskClosable
				open={wishlistDrawerOpen}
				onClose={() => setWishlistDrawerOpen(false)}
				zIndex={1000}
				height={500}
				width={500}
			>
				<List
					itemLayout="horizontal"
					dataSource={Object.keys(wishlist)}
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
												<div style={{ flex: 1 }}>
													<h3 className="mt-0 pt-0 font-semibold">
														{productInfo.title}
													</h3>
												</div>
												<div style={{ flex: 1, textAlign: "right" }}>
													<p className="mt-0 pt-0 font-semibold">
														Price: ${productInfo.price}
													</p>
												</div>
											</div>
											{/* Add to Cart and Remove from Wishlist Buttons */}
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
												}}
											>
												<button
													className="cursor-pointer border-slate-200 border-2 rounded-md px-1 md:px-2 md:py-1  flex flex-row gap-1 items-center"
													onClick={() => handleAddToCart(itemId)}
												>
													<ShoppingFilled className="md:text-xl" />{" "}
													<p className="font-semibold">Add to Cart</p>
												</button>
												<button
													className="cursor-pointer border-slate-200 border-2 rounded-md px-1 md:px-2 md:py-1  flex flex-row gap-1 items-center"
													onClick={() => handleRemoveFromWishlist(itemId)}
												>
													<DeleteFilled className="md:text-xl" />{" "}
													<p className="font-semibold">Remove</p>
												</button>
											</div>
										</div>
									</div>
								</Card>
							</List.Item>
						);
					}}
				/>
				{/* Display a message if the wishlist is empty */}
				{Object.keys(wishlist).length === 0 && (
					<Typography.Text>Wishlist is empty</Typography.Text>
				)}
			</Drawer>
		</div>
	);
}

export default Wishlist;
