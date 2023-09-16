import React from "react";

function AppFooter() {
	return (
		<div className="container mx-auto border-t-slate-300 border-t-2 pt-2">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<div className="mb-4 lg:mb-0">
					<h3 className="text-xl font-semibold mb-4">Shop Categories</h3>
					<ul className="space-y-2">
						<li>
							<a href="#" className="hover:text-slate-200">
								Electronics
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-slate-200">
								Clothing
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-slate-200">
								Home & Living
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-slate-200">
								Books
							</a>
						</li>
					</ul>
				</div>

				<div className="mb-4 lg:mb-0">
					<h3 className="text-xl font-semibold mb-4">Customer Service</h3>
					<ul className="space-y-2">
						<li>
							<a href="#" className="hover:text-slate-200">
								Contact Us
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-slate-200">
								FAQs
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-slate-200">
								Shipping
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-slate-200">
								Returns
							</a>
						</li>
					</ul>
				</div>

				<div className="mb-4 lg:mb-0">
					<h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
					<ul className="space-y-2">
						<li>
							<a href="#" className="hover:text-slate-200">
								Facebook
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-slate-200">
								Twitter
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-slate-200">
								Instagram
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-slate-200">
								LinkedIn
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="text-xl font-semibold mb-4">Newsletter</h3>
					<p className="mb-4">
						Subscribe to our newsletter for the latest updates and promotions.
					</p>
					<form className="flex items-center">
						<input
							type="email"
							placeholder="Your Email"
							className="bg-white text-black rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-slate-500 flex-1"
						/>
						<button
							type="submit"
							className="bg-slate-500 text-white rounded-r px-4 py-2 hover:bg-slate-200"
						>
							Subscribe
						</button>
					</form>
				</div>
			</div>

			<hr className="border-slate-500 my-8" />

			<div className="text-center">
				<p>&copy; 2023 Your E-Commerce Site. All rights reserved.</p>
			</div>
		</div>
	);
}

export default AppFooter;
