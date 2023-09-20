import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StyleProvider } from "@ant-design/cssinjs";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StyleProvider hashPriority="high">
			<Provider store={store}>
				<App />
			</Provider>
		</StyleProvider>
	</React.StrictMode>
);
