import ProductList from "../../components/productList";

function Home({ searchQuery }) {
	return (
		<div>
			<ProductList searchQuery={searchQuery} />
		</div>
	);
}

export default Home;
