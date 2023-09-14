import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	fetchProducts,
	fetchProductsByCategory,
} from "../redux/slice/products";
import {
	Card,
	List,
	Rate,
	Image,
	Typography,
	Button,
	Space,
	message,
	Skeleton,
} from "antd";
import { HeartOutlined, StarFilled, StarOutlined } from "@ant-design/icons";

const { Meta } = Card;

import { addToCart } from "../redux/slice/cart";
import { addToWishlist } from "../redux/slice/wish";

function ProductList() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.products.data);
	const isLoading = useSelector((state) => state.products.isLoading);
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
		dispatch(addToWishlist(product.id));
		message.success(`"${product.title}" added to wish list`);
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
						<List.Item>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									maxWidth: "300px",
								}}
							>
								<div className="flex-1">
									<Card
										cover={
											<img
												src="/assets/image-placeholder-vertical.jpg"
												alt={product.title}
											/>
										}
										bodyStyle={{ padding: "0" }}
									/>
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
															flex: 1,
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
														Add to Cart
													</Button>
													<Button
														onClick={() => handleAddtoWishList(product)}
														alt="Add to Wishlist"
														style={{
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
														}}
													>
														<HeartOutlined />
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
