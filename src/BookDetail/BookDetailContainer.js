import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRemoteService } from "../hooks";
import { bookSelector } from "../redux/selector";
import BookDetail from "./BookDetail";
import { fetchABook } from "../redux/actions/actions";

function BookDetailContainer() {
  let params = useParams();
  let bookNo = parseInt(params.bookId, 10);
  // const { data, loading, error } = useRemoteService(
  //   `http://localhost:8080/books/${bookNo}`,
  //   []
  // );

  const dispatch = useDispatch();
  // const mounted = useRef(true);

  useEffect(() => {
    dispatch(fetchABook(bookNo));
  }, []);

  const { book, loading, error } = useSelector(bookSelector);

  return <BookDetail book={book} loading={loading} error={error} />;
}

export default BookDetailContainer;
