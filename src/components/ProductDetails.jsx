import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../redux/slice/products";

function ProductDetails() {
	const { productId } = useParams();
	const dispatch = useDispatch();

	// Fetch product data from Redux store
	const product = useSelector((state) => state.products.data);
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

	// Render the product details when available
	return (
		<div className="grid grid-cols-1 md:grid-cols-2">
			<div className="flex flex-col w-full md:w-4/6 sm:mt-20 sm:ml-[80px]">
				<div>
					<img
						src="/assets/7088652_3519554.jpg"
						alt="product-main-img"
						className="rounded-md cursor-pointer hover:bg-primary-orange"
					/>
				</div>
				<div className="flex-row w-full pt-4 flex bg-white">
					{/* Thumbnails */}
					<div className="hidden md:flex justify-between">
						<img
							src="/assets/image-placeholder-500x500 (1).jpg"
							alt="Thumbnail 1"
							className="rounded-lg w-1/5 h-auto cursor-pointer hover:opacity-80"
						/>
						<img
							src="/assets/image-placeholder-500x500 (1).jpg"
							alt="Thumbnail 2"
							className="rounded-lg w-1/5 h-auto cursor-pointer hover:opacity-80"
						/>
						<img
							src="/assets/image-placeholder-500x500 (1).jpg"
							alt="Thumbnail 3"
							className="rounded-lg w-1/5 h-auto cursor-pointer hover:opacity-80"
						/>
						<img
							src="/assets/image-placeholder-500x500 (1).jpg"
							alt="Thumbnail 4"
							className="rounded-lg w-1/5 h-auto cursor-pointer hover:opacity-80"
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col sm:ml-2 sm:mt-24 p-5 sm:mr-14 sm:pt-6 sm:pr-20 justify-content-between">
				<h2 className="text-primary-orange font-bold mb-3">{product.brand}</h2>
				<div className="font-bold text-4xl mb-10">{product.title}</div>
				<p className="text-sm font-normal text-slate-500">
					{product.description}
				</p>
				<div className="mt-6">
					<div className="flex flex-row sm:flex-col justify-between">
						<div className="flex flex-row">
							<p className="font-extrabold text-2xl">{product.price}</p>
							<p className="self-center ml-4 px-2 py-1 rounded font-extrabold text-primary-orange bg-primary-pale-orange">
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
					<div className="grid grid-cols-3 p-2 px-6 md:p-0 items-center w-full bg-neutral-light-grayish-blue box-border rounded-md">
						<div className="cursor-pointer ml-10 md:ml-5 text-primary-orange hover:opacity-60 transition-opacity duration-[0.3s] text-2xl font-bold">
							<img src="/assets/icon-minus.svg" alt="" className="" />
						</div>
						<p className="text-black font-bold text-base text-center">1</p>
						<div className="cursor-pointer ml-10 md:ml-5 text-primary-orange hover:opacity-60 transition-opacity duration-[0.3s] text-2xl font-bold">
							<img src="/assets/icon-plus.svg" alt="" className="" />
						</div>
					</div>

					{/* Right Div */}
					<div className="flex items-center justify-center cursor-pointer col-span-2 p-4 px-8 w-full font-bold text-white text-xs box-border bg-primary-orange hover:opacity-60 transition-opacity duration-[0.3s] rounded-md">
						<div className="w-4 h-4 mr-2">
							<img src="/assets/icon-cart-white.svg" alt="" className="" />
						</div>
						<div>Add to Cart</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
