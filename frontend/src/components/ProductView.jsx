import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, decrementItemCart } from "../features/cartSlice";

const ProductView = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };
  const handleDecrementItemCart = (product) => {
    dispatch(decrementItemCart(product));
  };
  return (
    <React.Fragment>
      <Link to="/" className="btn btn-secondary go-back">
        Go Back
      </Link>

      <Row className="product-screen">
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush" my={2}>
            <ListGroup.Item>
              <h3> {product.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rateStat={product.rating} color="orange" />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col className="my-2">Qty</Col>
                    <Col xs="auto" className="my-1 item-quantity-info">
                      <button onClick={() => handleDecrementItemCart(product)}>
                        -
                      </button>
                      {cart.cartItems.find(
                        (item) => item._id === product._id
                      ) ? (
                        <span>
                          {
                            cart.cartItems.find(
                              (item) => item._id === product._id
                            ).cartItemQuantity
                          }
                        </span>
                      ) : (
                        0
                      )}
                      <button onClick={() => handleAddToCart(product)}>
                        +
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </ListGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProductView;
