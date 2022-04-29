import {
  SET_SEARCH_TERM,
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ENDED,
  FETCH_BOOK_FAILED,
  FETCH_BOOK_PENDING,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_ENDED,
  SAVE_BOOK_REVIEW_FAILED,
  SAVE_BOOK_REVIEW_PENDING,
  SAVE_BOOK_REVIEW_SUCCESS,
  SAVE_BOOK_REVIEW_ENDED,
} from "../types";

export default (state = [], action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return { ...state, term: action.payload };
    default:
      return state;
  }
};
