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
		<Card
			title={isLoginForm ? "Login" : "Registration"}
			style={{ textAlign: "center", gap: "20px" }}
		>
			{isLoginForm ? <LoginForm /> : <RegistrationForm />}
			<Button onClick={handleToggle}>
				{isLoginForm
					? "Not registered? Create an account"
					: "Already registered? Sign in instead"}
			</Button>
		</Card>
	);
};

export default LoginRegistration;
