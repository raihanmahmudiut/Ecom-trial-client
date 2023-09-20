/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ["Montserrat", "sans"],
			},
			backgroundColor: {
				gradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
			},
		},
	},
	plugins: [],
};
