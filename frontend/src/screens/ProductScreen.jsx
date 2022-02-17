import { useGetProductByIdQuery } from "../features/productsAPI";
import ProductView from "./../components/ProductView";
import { useParams } from "react-router";

const ProductScreen = () => {
  const { id } = useParams();
  const { data: product, isError, isLoading } = useGetProductByIdQuery(id);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>An error has occurred</p>
      ) : (
        <ProductView product={product} />
      )}
    </div>
  );
};

export default ProductScreen;
