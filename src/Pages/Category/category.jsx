import ProductList from "../../components/productList";

function Category({ searchQuery }) {
	return (
		<div>
			<ProductList searchQuery={searchQuery} />
		</div>
	);
}

export default Category;
