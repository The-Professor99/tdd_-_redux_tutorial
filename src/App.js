import React from "react";
import { Routes, Route } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./App.css";
import BooklistContainer from "./BookList/BooklistContainer";
import BookDetailContainer from "./BookDetail/BookDetailContainer";

function App() {
  return (
    <div className="App">
      <Typography variant="h2" component="h2" data-test="heading">
          Bookish   
      </Typography>
      <Routes>
        <Route path="/" element={<BooklistContainer />} />
        <Route path="/books/:bookId" element={<BookDetailContainer />} />
      </Routes>
    </div>
  );
}
export default App;
