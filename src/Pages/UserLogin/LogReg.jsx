import { Card, Button } from "antd";
import LoginForm from "../../components/LoginForm";
import RegistrationForm from "../../components/RegistrationForm";
import { useState } from "react";

const LoginRegistration = () => {
	const [isLoginForm, setIsLoginForm] = useState(true);

	const handleToggle = () => {
		setIsLoginForm(!isLoginForm);
	};

	return (
		<Card title={isLoginForm ? "Login" : "Registration"}>
			{isLoginForm ? <LoginForm /> : <RegistrationForm />}
			<Button onClick={handleToggle}>
				{isLoginForm ? "Switch to Registration" : "Switch to Login"}
			</Button>
		</Card>
	);
};

export default LoginRegistration;
