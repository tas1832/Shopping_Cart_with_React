import { useGetAllProductsQuery } from "../features/productsAPI";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SearchBox from "../components/SearchBox";
import { useState } from "react";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const { data, isError, isLoading } = useGetAllProductsQuery();
  const products = useSelector(() => {
    const allProducts = data;

    if (searchQuery === null) {
      return allProducts;
    } else {
      return allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };
  return (
    <div>
      <h2>Latest products</h2>
      <div className="search-box">
        <SearchBox onChange={handleSearch} />
      </div>
      <Row className="products-row">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>An error has occurred</p>
        ) : (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default HomeScreen;
