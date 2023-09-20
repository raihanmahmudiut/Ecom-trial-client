import AppMenu from "./components/appMenu";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;
import { BrowserRouter } from "react-router-dom";
import AppCart from "./components/appCart";
import "./App.css";
import PageContent from "./components/pageContent";
import WishList from "./components/wishList";

import UserLogReg from "./components/userLogReg";
import AppLogo from "./components/logo";

import AppFooter from "./components/appFooter";
import SearchInput from "./components/searchInput";
import { useState } from "react";

const headerStyle = {
	textAlign: "center",
	padding: 32,
	lineHeight: "64px",
	backgroundImage: "linear-gradient(to right, #243949 0%, #517fa4 100%)",
	alignItems: "center",
	paddingBottom: "36px",
	borderBottom: "1px solid #ccc",
};
const contentStyle = {
	minHeight: 600,
	lineHeight: "120px",
	color: "black",
};

const footerStyle = {
	textAlign: "center",
	color: "black",
};

function App() {
	const [searchQuery, setSearchQuery] = useState("");

	// Function to handle search
	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	return (
		<div className="w-max-screen">
			<Layout>
				<BrowserRouter>
					<Header
						style={headerStyle}
						className="flex flex-row space-x-3 md:space-x-0 justify-between items-center w-full h-15 md:h-12 rounded-bl-md rounded-br-md "
					>
						<div className="flex flex-row space-x-3">
							<AppMenu />
							<AppLogo />
						</div>

						{/* the SearchInput component */}
						<SearchInput onSearch={handleSearch} />
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "8px",
								justifyContent: "center",
								alignItems: "center",
							}}
							className=" text-white"
						>
							<WishList />
							<AppCart />
							<UserLogReg />
						</div>
					</Header>

					<Content
						style={contentStyle}
						className="flex justify-center md:pt-12"
					>
						<PageContent searchQuery={searchQuery} />
					</Content>
					<Footer style={footerStyle}>
						<AppFooter />
					</Footer>
				</BrowserRouter>
			</Layout>
		</div>
	);
}

export default App;
