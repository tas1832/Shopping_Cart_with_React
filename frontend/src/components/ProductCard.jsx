import { addToCart } from "../features/cartSlice";
import React from "react";
import Rating from "./Rating";
import { useDispatch } from "react-redux";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="card-container">
      <Card.Body className="card-body">
        <Link to={`/products/${product._id}`}>
          <Card.Img
            className="product-image"
            src={product.image}
            alt={product.title}
          />
        </Link>

        <Link to={`/products/${product._id}`}>
          <Card.Title as="h3">
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating rateStat={product.rating} color="orange" />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
        <Card.Text as="p">{product.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="card-footer">
        <Link to={`/products/${product._id}`}>
          <button type="button" className="btn btn-secondary center">
            Read more
          </button>
        </Link>

        <button
          type="button"
          className="btn btn-danger center"
          onClick={() => handleAddToCart(product)}
        >
          Add to cart
        </button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
