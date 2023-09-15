import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	fetchProducts,
	fetchProductsByCategory,
} from "../redux/slice/products";
import { Card, List, Typography, Button, message, Skeleton, Badge } from "antd";
import { HeartFilled, StarFilled } from "@ant-design/icons";

const { Meta } = Card;

import { addToCart } from "../redux/slice/cart";
import { toggleWishlist } from "../redux/slice/wish";

function ProductList() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.products.data);
	const cart = useSelector((state) => state.cart.data);

	const isLoading = useSelector((state) => state.products.isLoading);
	const wishlist = useSelector((state) => state.wish.data);
	const { categoryId } = useParams();

	useEffect(() => {
		if (categoryId) {
			dispatch(fetchProductsByCategory(categoryId));
		} else {
			dispatch(fetchProducts());
		}
	}, [dispatch, categoryId]);

	const handleAddToCart = (product) => {
		dispatch(addToCart(product.id));
		message.success(`"${product.title}" added to cart`);
	};

	const handleAddtoWishList = (product) => {
		dispatch(toggleWishlist(product.id));
		message.success(
			`"${product.title}" ${
				wishlist[product.id] ? "removed from" : "added to"
			} wish list`
		);
	};

	const isItemInWishlist = (productId) => {
		return Boolean(wishlist[productId]);
	};

	return (
		<div>
			{isLoading ? (
				<Skeleton active />
			) : state && state.products ? (
				<List
					grid={{
						gutter: [24, 24],
						xs: 1,
						sm: 2,
						md: 3,
						lg: 4,
					}}
					dataSource={state.products}
					renderItem={(product) => (
						<List.Item style={{ display: "flex", justifyContent: "center" }}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									maxWidth: "300px",
									textAlign: "center",
								}}
							>
								<div className="flex-1">
									<Badge.Ribbon
										text={`${product.discountPercentage}% Off`}
										color="red"
									>
										<Card
											cover={
												<img
													src="/assets/image-placeholder-vertical.jpg"
													alt={product.title}
												/>
											}
											bodyStyle={{ padding: "0" }}
										/>
									</Badge.Ribbon>
								</div>
								<div
									style={{
										flex: 0,
										marginTop: "8px",
										paddingLeft: "8px",
										paddingRight: "8px",
									}}
								>
									<Meta
										title={
											<div
												style={{
													fontWeight: "bold",
													display: "flex",
													flex: 1,
													justifySelf: "flex-start",
													paddingBottom: "4px",
												}}
											>
												{product.title}
											</div>
										}
										description={
											<div style={{ display: "flex", flexDirection: "column" }}>
												<div
													style={{
														display: "flex",
														flex: 1,
														textAlign: "left",
													}}
												>
													<div
														style={{
															display: "flex",
															flex: 1,
															justifyContent: "flex-start",
															alignItems: "center",
														}}
													>
														<Typography.Paragraph
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
																marginBottom: 0,
															}}
														>
															Price: ${product.price}{" "}
															<Typography.Text
																delete
																type="secondary"
																style={{ marginLeft: "8px" }}
															>
																$
																{parseFloat(
																	product.price +
																		(product.price *
																			product.discountPercentage) /
																			100
																).toFixed(2)}
															</Typography.Text>
														</Typography.Paragraph>
													</div>
													<div
														style={{
															display: "flex",
														}}
													>
														<div
															style={{
																display: "flex",
																flex: 1,
																justifyContent: "flex-end",
																alignItems: "center",
															}}
														>
															<span style={{ color: "#FF9529" }}>
																<StarFilled />
															</span>
															{product.rating.toFixed(1)}
														</div>
													</div>
												</div>
												<div
													style={{
														display: "flex",
														flexDirection: "row",
														flex: 1,
														gap: "4px",
														marginTop: "8px",
													}}
												>
													<Button
														type="default"
														onClick={() => handleAddToCart(product)}
														style={{
															display: "flex",
															flex: 1,
															width: "80%",
															alignItems: "center",
															justifyContent: "center",
														}}
													>
														Add to Cart{" "}
														{cart[product.id] && cart[product.id] > 0 && (
															<span style={{ marginLeft: "8px" }}>
																({cart[product.id]})
															</span>
														)}
													</Button>

													<Button
														onClick={() => handleAddtoWishList(product)}
														alt="Add to Wishlist"
														style={{
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															color: isItemInWishlist(product.id)
																? "red" // If the item is in the wishlist, set color to red
																: "", // Otherwise, leave it empty to use the default color
														}}
														className="group"
													>
														<HeartFilled className="text-current transition-colors group-hover:text-red-500" />
													</Button>
												</div>
											</div>
										}
									/>
								</div>
							</div>
						</List.Item>
					)}
				/>
			) : (
				<div>No products available</div>
			)}
		</div>
	);
}

export default ProductList;
