import {
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ENDED,
} from "../types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_BOOKS_PENDING:
      return { ...state, loading: true };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, books: action.payload };
    case FETCH_BOOKS_ENDED:
      return { ...state, loading: false };
    case FETCH_BOOKS_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
};
