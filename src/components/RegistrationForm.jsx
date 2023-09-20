import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const RegistrationForm = () => {
	const onFinish = (values) => {
		console.log("Registration form values:", values);
	};

	return (
		<Form name="registration" onFinish={onFinish}>
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
			<Form.Item
				name="confirmPassword"
				dependencies={["password"]}
				rules={[
					{ required: true, message: "Please confirm your password!" },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject("Passwords do not match!");
						},
					}),
				]}
			>
				<Input.Password
					prefix={<LockOutlined />}
					placeholder="Confirm Password"
				/>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Register
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegistrationForm;
