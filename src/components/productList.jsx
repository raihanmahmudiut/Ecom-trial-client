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
	Skeleton,
	message,
} from "antd";
import { HeartOutlined, StarFilled, StarOutlined } from "@ant-design/icons";

const { Meta } = Card;
import { addToCart } from "../redux/slice/cart";

function ProductList() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.products.data);
	const { categoryId } = useParams();

	// Dispatch the fetchProducts action when the component mounts
	useEffect(() => {
		if (categoryId) {
			// Dispatch the action to fetch products by category
			dispatch(fetchProductsByCategory(categoryId));
		} else {
			// Dispatch the action to fetch all products
			dispatch(fetchProducts());
		}
	}, [dispatch, categoryId]);

	// Function to handle "Add to Cart" button click
	const handleAddToCart = (product) => {
		dispatch(addToCart(product.id)); // Dispatch addToCart action with the product ID
		message.success(`"${product.title}" added to cart`); // Show a success message with the product title
	};

	return (
		<div>
			{state && (
				<List
					grid={{
						gutter: [24, 24], // Set the default gutter
						xs: 1, // 1 column for screens smaller than 576px (small screens)
						sm: 2, // 2 columns for screens between 576px and 768px (medium screens)
						md: 3,
						lg: 4, // 3 columns for screens between 768px and 992px (large screens)
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
															justifyContent: "flex-start", // Push items to the right
															alignItems: "center",
														}}
													>
														<Typography.Paragraph
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
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
																justifyContent: "flex-end", // Push items to the right
																alignItems: "center", // Vertically center items
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
															alignItems: "center", // Center vertically
															justifyContent: "center", // Center horizontally
														}}
													>
														Add to Cart
													</Button>
													<Button
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
			)}
		</div>
	);
}

export default ProductList;
