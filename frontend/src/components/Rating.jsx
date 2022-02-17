import React from "react";
import _ from "lodash";
import { Row, Col } from "react-bootstrap";

const Rating = ({ rateStat, color }) => {
  const rating = rateStat.rate;
  const numReviews = rateStat.count;
  const floatPart = rating - Math.trunc(rating);

  const highestRating = 5;

  let startGrey = null;
  let endColor = null;
  if (floatPart >= 0.5) {
    startGrey = Math.trunc(rating) + 2;
    endColor = Math.trunc(rating) + 1;
  } else {
    startGrey = Math.trunc(rating) + 1;
    endColor = Math.trunc(rating);
  }
  const ratingArray = _.range(1, endColor);
  const emptyRating = _.range(startGrey, highestRating + 1);

  return (
    <Row>
      <Col>
        {ratingArray.map((starNo) => (
          <i style={{ color }} key={starNo} className={"fas fa-star"}></i>
        ))}
        <i
          style={{ color }}
          key={Math.trunc(rating) + 1}
          className={floatPart >= 0.5 ? "fas fa-star-half" : "fas fa-star"}
        ></i>
        {emptyRating.map((starNo) => (
          <i
            style={{ color: "grey" }}
            key={starNo}
            className={"fas fa-star"}
          ></i>
        ))}
      </Col>
      <Col>{numReviews} Reviews</Col>
    </Row>
  );
};

export default Rating;
