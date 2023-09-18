import AppRoutes from "./Routes";

export default function PageContent({ searchQuery }) {
	return (
		<div className="flex flex-1">
			<AppRoutes searchQuery={searchQuery} />
		</div>
	);
}
