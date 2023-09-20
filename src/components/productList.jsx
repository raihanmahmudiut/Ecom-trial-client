import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
	fetchProducts,
	fetchProductsByCategory,
	searchProducts,
} from "../redux/slice/products";
import {
	Card,
	List,
	Typography,
	message,
	Skeleton,
	Badge,
	Carousel,
} from "antd";
import { ShoppingFilled, StarFilled } from "@ant-design/icons";

const { Meta } = Card;

import { addToCart } from "../redux/slice/cart";
import { toggleWishlist } from "../redux/slice/wish";
import WishlistHeartIcon from "./WishListheartIcon";

function ProductList({ searchQuery }) {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.products.data);
	const cart = useSelector((state) => state.cart.data);

	const isLoading = useSelector((state) => state.products.isLoading);
	const wishlist = useSelector((state) => state.wish.data);
	const { categoryId } = useParams();

	useEffect(() => {
		if (searchQuery) {
			// If there's a search query, fetch products based on the query
			dispatch(searchProducts(searchQuery));
		} else if (categoryId) {
			// If there's a category ID, fetch products by category
			dispatch(fetchProductsByCategory(categoryId));
		} else {
			// Otherwise, fetch all products
			dispatch(fetchProducts());
		}
	}, [dispatch, categoryId, searchQuery]);

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

	const onChange = (currentSlide) => {
		console.log(currentSlide);
	};

	return (
		<div className="">
			{isLoading ? (
				<Skeleton active />
			) : state && state.products ? (
				<List
					grid={{
						gutter: [48, 48],
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
									maxWidth: "280px",

									textAlign: "center",
								}}
							>
								<div className="flex-1">
									<Badge.Ribbon text={`${product.discountPercentage}% Off`}>
										<Card
											cover={
												<Link to={`/productdetails/${product.id}`}>
													<Carousel afterChange={onChange}>
														{product.images.map((image, index) => (
															<div key={index}>
																<img
																	src={image} // Assuming image is the URL of the image
																	alt={`Slide ${index + 1}`}
																	className=" object-scale-down w-72 h-96"
																/>
															</div>
														))}
													</Carousel>
												</Link>
											}
											bodyStyle={{ padding: "0" }}
											style={{
												backgroundImage:
													"linear-gradient(to top, #fff1eb 0%, #ace0f9 1%)",
											}}
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
															<Typography.Text
																delete
																type="secondary"
																style={{ marginRight: "8px" }}
															>
																$
																{parseFloat(
																	product.price +
																		(product.price *
																			product.discountPercentage) /
																			100
																).toFixed(2)}
															</Typography.Text>
															${product.price}{" "}
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
													<button
														className="cursor-pointer border-slate-300 border-2 bg-gradient-to-r from-teal-300 to-indigo-400 hover:bg-opacity-80 text-slate-800 rounded-md px-1 md:px-3 md:py-1 w-11/12 flex flex-row gap-1 justify-center items-center"
														onClick={() => handleAddToCart(product)}
													>
														<ShoppingFilled className="md:text-xl" />{" "}
														<p className="font-semibold">
															Add to Cart
															{cart[product.id] && cart[product.id] > 0 && (
																<span style={{ marginLeft: "8px" }}>
																	({cart[product.id]})
																</span>
															)}
														</p>
													</button>

													<button
														alt="Add to Wishlist"
														style={{
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
														}}
														className="  text-white rounded-md px-1 md:px-3"
													>
														<WishlistHeartIcon
															inWishlist={isItemInWishlist(product.id)}
															onClick={() => handleAddtoWishList(product)}
														/>
													</button>
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
