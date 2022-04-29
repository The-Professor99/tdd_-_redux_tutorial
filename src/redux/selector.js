import { createSelector } from "reselect";

const bookListSelector = createSelector(
  [
    (state) => state.books.books,
    (state) => state.books.loading,
    (state) => state.error,
  ],
  (books, loading, error) => ({ books, loading, error })
);

const bookSelector = createSelector(
  [
    (state) => state.details.book,
    (state) => state.details.loading,
    (state) => state.error,
  ],
  (book, loading, error) => ({ book, loading, error })
);

export { bookListSelector, bookSelector };
