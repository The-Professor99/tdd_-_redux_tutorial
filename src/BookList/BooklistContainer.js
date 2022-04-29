import Booklist from "./Booklist";
import { useRemoteService } from "../hooks";
import { useState, useEffect, useRef } from "react";
import SearchBox from "../_components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/actions/actions";
import { bookListSelector } from "../redux/selector";
import { useSearchParams } from "react-router-dom";
function BooklistContainer() {
  // const { data, loading, error } = useRemoteService(
  //   "http://localhost:8080/books",
  //   []
  // );
  const dispatch = useDispatch();
  // const mounted = useRef(true);

  useEffect(() => {
    // if (mounted.current) {
    //   dispatch(fetchBooks());
    // }

    // return () => {
    //   mounted.current = false;
    // };

    dispatch(fetchBooks());
  }, []);

  const { books, loading, error } = useSelector(bookListSelector);

  return (
    <>
      <SearchBox />
      <Booklist books={books} loading={loading} error={error} />;
    </>
  );
}

export default BooklistContainer;
