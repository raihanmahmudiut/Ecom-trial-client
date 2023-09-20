import AppRoutes from "./Routes";

export default function PageContent({ searchQuery }) {
	return (
		<div className="flex justify-center">
			<AppRoutes searchQuery={searchQuery} />
		</div>
	);
}
