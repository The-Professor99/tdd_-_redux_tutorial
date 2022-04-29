import axios from "axios";

import { setSearchTerm, fetchBooks, fetchABook } from "./redux/actions/actions";
import store from "./store";

describe("Store", () => {
  it("Fetch books from remote", () => {
    const books = [{ id: 1, name: "Refactoring" }];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));

    return store.dispatch(fetchBooks()).then(() => {
      const state = store.getState();
      expect(state.books.books.length).toEqual(1);
      expect(state.books.books).toEqual(books);
    });
  });

  it("Fails to fetch books from remote", () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.reject({ message: true }));

    return store.dispatch(fetchBooks()).then(() => {
      const state = store.getState();
      expect(state.errors).toBeTruthy();
    });
  });

  it("Fetch a book from remote", () => {
    const books = [{ id: 1, name: "Refactoring" }];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books[0] }));
    return store.dispatch(fetchABook(1)).then(() => {
      const state = store.getState();
      expect(state.details.book).toEqual(books[0]);
    });
  });

  it("Performs a search", () => {
    const books = [{ id: 1, name: "Refactoring" }];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));

    store.dispatch(setSearchTerm("domain"));

    return store.dispatch(fetchBooks()).then(() => {
      const state = store.getState();
      expect(state.search.term).toEqual("domain");
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/books?q=domain"
      );
    });
  });
});
