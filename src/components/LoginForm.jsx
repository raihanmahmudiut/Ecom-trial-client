import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slice/user"; // Import your login and logout actions
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get the isLoggedIn state from Redux
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const onFinish = async (values) => {
		const { username, password } = values;

		try {
			const response = await fetch("https://dummyjson.com/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});

			if (!response.ok) {
				// Handle non-successful response (e.g., display an error message)
				throw new Error("Login failed");
			}

			const data = await response.json();
			console.log(data);
			if (response.status === 200) {
				// The login was successful
				// Dispatch the login action to update the Redux state
				dispatch(login());
				message.success("Login Successful");
				navigate("/");
			} else {
				// The login was not successful
				console.error("Login failed:", data.message);
				message.error("Login failed. Please check your credentials.");
			}
		} catch (error) {
			// Handle any network errors or exceptions
			console.error("Login error:", error);
			message.error("An error occurred during login.");
		}
	};

	// Conditional rendering based on the isLoggedIn state

	// Render the login form if the user is not logged in
	return (
		<Form name="login" onFinish={onFinish}>
			<Form.Item
				name="username"
				rules={[{ required: true, message: "Please enter your username!" }]}
			>
				<Input prefix={<UserOutlined />} placeholder="Username" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: "Please enter your password!" }]}
			>
				<Input.Password prefix={<LockOutlined />} placeholder="Password" />
			</Form.Item>
			<Form.Item>
				<Button type="default" htmlType="submit">
					Login
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
