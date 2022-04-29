import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateReview } from "../redux/actions/actions";
import { Review } from "./Review";

const ReviewList = ({ reviews, id }) => {
  return (
    <div data-test="reviews-container">
      {reviews.map((review) => (
        <div key={review.name + review.date}>
          <Review review={review} id={id} />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
