import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../redux/slice/products";

import { addToCart } from "../redux/slice/cart";
import { toggleWishlist } from "../redux/slice/wish";
import { Breadcrumb, message } from "antd";
import {
	HeartFilled,
	MinusCircleFilled,
	PlusCircleFilled,
	ShoppingFilled,
} from "@ant-design/icons";
import WishlistHeartIcon from "./WishListheartIcon";

function ProductDetails() {
	const { productId } = useParams();
	const dispatch = useDispatch();
	const [selectedQuantity, setSelectedQuantity] = useState(1);

	const handleIncrement = () => {
		setSelectedQuantity(selectedQuantity + 1);
	};

	const handleDecrement = () => {
		if (selectedQuantity > 1) {
			setSelectedQuantity(selectedQuantity - 1);
		}
	};

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
		<div className="flex flex-col">
			<div className="ml-20 font-semibold">
				<Breadcrumb items={items} className="mb-8" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-t from-white via-ace0f9 to-white py-10 rounded-lg">
				<div className="flex flex-col w-full md:w-4/6 sm:mt-6 sm:ml-[80px]">
					{/* Breadcrumb */}

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
				<div className="flex flex-col justify-between px-10  py-8 ">
					<h2 className="self-start text-slate-500 font-bold text-xl mb-4">
						{product.brand}
					</h2>
					<div className=" self-start font-bold text-4xl mb-10">
						{product.title}
					</div>
					<p className="self-start text-lg font-normal text-slate-500">
						{product.description}
					</p>
					<div className="mt-6">
						<div className="flex flex-col justify-between gap-4">
							<div className="flex flex-row gap-2 h-6">
								<p className=" self-center font-extrabold text-2xl">
									${product.price}
								</p>
								<p className="self-center font-extrabold text-slate-500 ">
									<span className="bg-slate-200 p-1 rounded-lg">
										{product.discountPercentage}%
									</span>
								</p>
							</div>
							<div className="self-start text-slate-500 text-sm font-bold">
								$
								<del>
									{parseFloat(
										product.price +
											(product.price * product.discountPercentage) / 100
									).toFixed(2)}
								</del>
							</div>
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-4 mt-8 justify-start items-center">
						{/* Left Div */}
						{/* <div className="grid grid-cols-3 w-full md:w-1/4 items-center box-border border-slate-300 border-2 bg-cyan-300 rounded-md">
							<div
								className="cursor-pointer text-black text-center  text-2xl font-bold"
								onClick={handleIncrement}
							>
								<PlusCircleFilled alt="" className="" />
							</div>
							<p className="text-black font-bold text-base text-center">
								{selectedQuantity}
							</p>
							<div
								className="cursor-pointer text-black text-center  text-2xl font-bold"
								onClick={handleDecrement}
							>
								<MinusCircleFilled alt="" className="" />
							</div>
						</div> */}

						{/* Right Div */}

						<div className="flex flex-row w-full md:w-1/3 justify-between gap-2 h-9">
							<button
								className="cursor-pointer w-11/12 border-slate-300 border-2 bg-gradient-to-r from-teal-300 to-indigo-400 text-slate-800 rounded-md flex flex-row gap-1 justify-center items-center"
								onClick={() => handleAddToCart(product)}
							>
								<ShoppingFilled className="md:text-xl" />
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
