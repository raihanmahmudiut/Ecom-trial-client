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

const headerStyle = {
	textAlign: "center",
	color: "black",
	height: 64,
	padding: 50,

	lineHeight: "64px",
	backgroundColor: "#fff",
	justifyContent: "space-between",
	alignItems: "center",
	zIndex: 99,
	paddingBottom: "48px",
	borderBottom: "1px solid #ccc",
};
const contentStyle = {
	textAlign: "center",
	justifyContent: "center",
	alignItems: "center",
	minHeight: 600,
	lineHeight: "120px",
	color: "black",
	backgroundColor: "#fff",
	zIndex: 49,
};

const footerStyle = {
	textAlign: "center",
	color: "black",
	backgroundColor: "#fff",
	zIndex: 49,
};

function App() {
	return (
		<div className=" w-max-screen">
			<Layout>
				<BrowserRouter>
					<Header
						style={headerStyle}
						className="flex flex-row justify-between items-center md:px-24 w-full h-30 md:h-24 md:p-12"
					>
						<div>
							<AppLogo />
						</div>
						<div className="hidden md:block w-full">
							<AppMenu />
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "8px",
							}}
						>
							<WishList />
							<AppCart />
							<UserLogReg />
						</div>
					</Header>

					<Content
						style={contentStyle}
						className="flex flex-col justify-center items-center px-4 pt-5 md:px-24 md:pt-12"
					>
						<div className="md:hidden pb-10">
							<AppMenu />
						</div>
						<PageContent />
					</Content>
					<Footer style={footerStyle}>Footer</Footer>
				</BrowserRouter>
			</Layout>
		</div>
	);
}

export default App;
