import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../redux/slice/products";

import { addToCart } from "../redux/slice/cart";
import { toggleWishlist } from "../redux/slice/wish";
import { Breadcrumb, message } from "antd";
import { HeartFilled, ShoppingFilled } from "@ant-design/icons";
import WishlistHeartIcon from "./WishListheartIcon";

function ProductDetails() {
	const { productId } = useParams();
	const dispatch = useDispatch();

	// Fetch product data from Redux store
	const product = useSelector((state) => state.products.productById);
	const cart = useSelector((state) => state.cart.data);

	const wishlist = useSelector((state) => state.wish.data);

	const handleAddToCart = () => {
		dispatch(addToCart(productId)); // Pass productId instead of the entire product
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

	const isLoading = useSelector((state) => state.products.isLoading);
	const isError = useSelector((state) => state.products.isError);

	// Trigger the fetch when the component mounts
	useEffect(() => {
		// You should dispatch the action with productId as an argument
		dispatch(fetchProductById(productId));
	}, [dispatch, productId]);

	// Check if product is undefined to avoid rendering errors
	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error fetching product details</p>;
	}

	if (!product || !Array.isArray(product.images)) {
		return <p>No product data available</p>;
	}

	//Breadcrumbs
	const items = [
		{
			title: <Link to="/">Home</Link>,
		},

		{
			title: <Link to={`/${product.category}`}>{product.category}</Link>,
		},
		{
			title: product.title,
		},
	];
	//Choosing only 4 images from the array

	const limitedImages = product.images.slice(0, 4);

	// Render the product details when available
	return (
		<div className="grid grid-cols-1 md:grid-cols-2">
			<div className="flex flex-col w-full md:w-4/6 sm:mt-6 sm:ml-[80px]">
				{/* Breadcrumb */}
				<Breadcrumb items={items} className="mb-8" />
				<div>
					<img
						src={product.thumbnail}
						alt="product-main-img"
						className="rounded-md cursor-pointer hover:bg-primary-orange"
					/>
				</div>
				<div className="flex-row w-full pt-4 flex bg-white">
					{/* Thumbnails */}
					<div className="hidden md:flex justify-between">
						{limitedImages.map((image, index) => (
							<img
								key={index}
								src={image}
								alt="`Thumbnail ${index +1}`"
								className="rounded-lg w-1/5 h-auto cursor-pointer hover:opacity-80"
							/>
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-col  justify-content-between">
				<h2 className="text-slate-500 font-bold">{product.brand}</h2>
				<div className="font-bold text-4xl mb-10">{product.title}</div>
				<p className="text-sm font-normal text-slate-500">
					{product.description}
				</p>
				<div className="mt-6">
					<div className="flex flex-row sm:flex-col justify-between">
						<div className="flex flex-row">
							<p className="font-extrabold text-2xl">{product.price}</p>
							<p className="rounded font-extrabold text-slate-800 bg-slate-200">
								50%
							</p>
						</div>
						<div className="text-slate-500 text-sm font-bold">
							<del>
								{parseFloat(
									product.price +
										(product.price * product.discountPercentage) / 100
								).toFixed(2)}
							</del>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:grid md:grid-cols-3 gap-4 mt-8">
					{/* Left Div */}
					<div className="grid grid-cols-3 p-2 px-6 md:p-0 items-center w-full bg-white box-border rounded-md">
						<div className="cursor-pointer text-black hover:opacity-60 transition-opacity duration-[0.3s] text-2xl font-bold">
							<img src="/assets/icon-minus.svg" alt="" className="" />
						</div>
						<p className="text-black font-bold text-base text-center">1</p>
						<div className="cursor-pointer text-black hover:opacity-60 transition-opacity duration-[0.3s] text-2xl font-bold">
							<img src="/assets/icon-plus.svg" alt="" className="" />
						</div>
					</div>

					{/* Right Div */}
					<div className="flex items-center justify-center cursor-pointer col-span-2 p-4 px-8 w-full font-bold text-white text-sm box-border rounded-md">
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
								className="cursor-pointer border-slate-300 border-2 bg-gray hover:bg-opacity-80 text-slate-800 rounded-md px-1 md:px-3 md:py-2 w-11/12 flex flex-row gap-1 justify-center items-center"
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
								className=" border-slate-300 border-2 text-white rounded-md px-1 md:px-3"
							>
								<WishlistHeartIcon
									inWishlist={isItemInWishlist(product.id)}
									onClick={() => handleAddtoWishList(product)}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
