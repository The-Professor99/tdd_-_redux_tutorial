import axios from "axios";
import {
  SET_SEARCH_TERM,
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  SAVE_BOOK_REVIEW_FAILED,
  SAVE_BOOK_REVIEW_PENDING,
  SAVE_BOOK_REVIEW_SUCCESS,
  SAVE_BOOK_REVIEW_ENDED,
} from "../types";

export const setSearchTerm = (term) => {
  return (dispatch) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  };
};

export const fetchBooks = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "FETCH_BOOKS_PENDING" });

    try {
      const res = await axios.get(
        `http://localhost:8080/books?q=${state.search.term || ""}`
      );
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({
        type: "FETCH_BOOKS_FAILED",
        payload: { message: err.message },
      });
    }
    dispatch({
      type: "FETCH_BOOKS_ENDED",
    });
  };
};

export const fetchABook = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "FETCH_BOOK_PENDING" });
    try {
      const res = await axios.get(`http://localhost:8080/books/${id}`);
      dispatch({ type: "FETCH_BOOK_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({
        type: "FETCH_BOOK_FAILED",
        payload: { message: err.message },
      });
    }
    dispatch({
      type: "FETCH_BOOK_ENDED",
    });
  };
};

const findBook = async (id, review) => {
  const res = await axios.get(`http://localhost:8080/books/${id}`);
  const book = res.data;
  if (!book.reviews) {
    book["reviews"] = [];
  }
  review["id"] = book["reviews"].length + 1;
  review["date"] = new Date();
  book.reviews.push(review);
  return book;
};

// const find = async (arg) => {
//   books.find((book, index) => {
//     if (book.id === arg) {
//       console.log(book.reviews);
//       book.reviews.push("reviewed");
//     } else {
//       return false;
//     }
//   });
// };

const findReview = async (reviewId, review, bookId) => {
  const res = await axios.get(`http://localhost:8080/books/${bookId}`);
  const book = res.data;
  if (book.reviews) {
    book.reviews.find((reviews) => {
      if (reviews.id == reviewId) {
        reviews.content = review.content;
        reviews.date = new Date();
      } else {
        return false;
      }
    });
  }
  return book;
};

export const saveReview = (id, review) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  return async (dispatch) => {
    dispatch({
      type: SAVE_BOOK_REVIEW_PENDING,
    });
    // until i find a better way to update the api.
    const reviewed_book = await findBook(id, review);

    try {
      // when i can post to the url below well(by setting up the server successfully), replace "reviewed_book" below with "review"
      const res = await axios.put(
        `http://localhost:8080/books/${id}`,
        reviewed_book
      );
      dispatch({ type: SAVE_BOOK_REVIEW_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: SAVE_BOOK_REVIEW_FAILED,
        payload: { message: err.message },
      });
    }
    dispatch({
      type: SAVE_BOOK_REVIEW_ENDED,
    });
  };
};

export const updateReview = (id, review, bookId) => {
  return async (dispatch) => {
    dispatch({ type: SAVE_BOOK_REVIEW_PENDING });

    // until i find a better way to update the api.
    const reviewed_book = await findReview(id, review, bookId);
    try {
      // when api is set up successfully for post and put requests to various endpoints eg. /books/1, /books/1/reviews. update this part too to that effect"
      const res = await axios.put(
        `http://localhost:8080/books/${bookId}`,
        reviewed_book
      );

      dispatch({ type: SAVE_BOOK_REVIEW_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: SAVE_BOOK_REVIEW_FAILED,
        payload: { message: err.message },
      });
    }
    dispatch({
      type: SAVE_BOOK_REVIEW_ENDED,
    });
  };
};
