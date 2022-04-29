import React, { useState } from "react";
import ReviewList from "../reviews/ReviewList";
import ReviewForm from "./ReviewForm";

const getDescriptionFor = (book) => {
  return book.description ? book.description : book.name;
};

function BookDetail({ loading, error, book }) {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error || !book) {
    return <p>Error, Cannot Retrieve items!</p>;
  }
  return (
    <div className="detail">
      <h2 className="book-title">{book.name}</h2>
      <p className="book-description">{getDescriptionFor(book)}</p>
      <ReviewForm id={book.id} />
      {book.reviews && <ReviewList reviews={book.reviews} id={book.id} />}
    </div>
  );
}

export default BookDetail;
