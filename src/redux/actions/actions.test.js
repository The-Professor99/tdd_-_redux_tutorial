import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import {
  SET_SEARCH_TERM,
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ENDED,
} from "../types";

import {
  setSearchTerm,
  fetchBooks,
  fetchABook,
  saveReview,
  updateReview,
} from "./actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Booklist container related actions", () => {
  it("Sets the search keyword", () => {
    const payload = "domain";
    const expected = [
      {
        type: "SET_SEARCH_TERM",
        payload,
      },
    ];

    const store = mockStore({ books: [], search: { term: "" } });
    store.dispatch(setSearchTerm(payload));
    expect(store.getActions()).toEqual(expected);
  });

  it("Fetches data successfully", () => {
    const payload = [
      { id: 1, name: "Refactoring" },
      { id: 2, name: "Domain-driven design" },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: payload }));

    const expectedActions = [
      { type: FETCH_BOOKS_PENDING },
      { type: FETCH_BOOKS_SUCCESS, payload },
      { type: FETCH_BOOKS_ENDED },
    ];

    const store = mockStore({ books: [], search: { term: "" } });
    return store.dispatch(fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Fetches data with error", () => {
    axios.get = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ message: "Something went wrong" })
      );

    const expectedActions = [
      { type: "FETCH_BOOKS_PENDING" },
      {
        type: "FETCH_BOOKS_FAILED",
        payload: { message: "Something went wrong" },
      },
      { type: "FETCH_BOOKS_ENDED" },
    ];

    const store = mockStore({ books: {}, search: { term: "" } });
    return store.dispatch(fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Fetch book by id", () => {
    const book = { id: 1, name: "Refactoring" };
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: book }));
    const store = mockStore({ list: { books: [], search: { term: "" } } });
    return store.dispatch(fetchABook(1)).then(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/books/1");
    });
  });

  it("Search data with term", () => {
    const books = [
      { id: 1, name: "Refactoring" },
      { id: 2, name: "Domain-driven design" },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));
    const store = mockStore({ books: [], search: { term: "domain" } });
    return store.dispatch(fetchBooks()).then(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/books?q=domain"
      );
    });
  });

  it("Saves a review for a book", () => {
    const review = {
      name: "Ihechi",
      content: "Excellent work!",
    };

    const mockDateObject = new Date("2022-04-26T22:42:16.652Z");

    const spy = jest
      .spyOn(global, "Date")
      .mockImplementation(() => mockDateObject);

    const book = { id: 1, name: "Refactoring" };

    const reviewed_book = {
      id: 1,
      name: "Refactoring",
      reviews: [
        {
          name: "Ihechi",
          id: 1,
          date: new Date(),
          content: "Excellent work!",
        },
      ],
    };

    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: book }));

    const store = mockStore({ books: [], search: { term: "" } });

    // comment this code when you do the below comment

    axios.put = jest.fn().mockImplementation(() => Promise.resolve({}));

    // console.warn("check this file for codes to comment out and vice versa");
    return store.dispatch(saveReview(1, review)).then(() => {
      spy.mockRestore();
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:8080/books/1",
        reviewed_book
      );
    });

    // comment out this code when you successfully set up api to allow post requests to /books/1

    // axios.post = jest.fn().mockImplementation(() => Promise.resolve({}));

    // return store.dispatch(saveReview(1, review)).then(() => {
    //   expect(axios.post).toHaveBeenCalledWith(
    //     "http://localhost:8080/books/1",
    //     review
    //   );
    // });
  });

  // comment for same reason as above
  it("Update a review for a book", () => {
    const review = {
      name: "Ihechi Festus",
      id: 1,
      content: "Excellent work boss!",
    };

    const book = {
      id: 1,
      name: "Refactoring",
      reviews: [
        {
          name: "Ihechi Festus",
          id: 1,
          content: "Excellent work",
        },
      ],
    };
    const mockDateObject = new Date("2022-04-26T22:42:16.652Z");

    const spy = jest
      .spyOn(global, "Date")
      .mockImplementation(() => mockDateObject);

    const reviewed_book = {
      id: 1,
      name: "Refactoring",
      reviews: [
        {
          name: "Ihechi Festus",
          id: 1,
          date: new Date(),
          content: "Excellent work boss!",
        },
      ],
    };

    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: book }));

    axios.put = jest.fn().mockImplementation(() => Promise.resolve({}));

    const store = mockStore({ list: { books: [], search: { term: "" } } });

    return store.dispatch(updateReview(1, review, 1)).then(() => {
      spy.mockRestore();
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:8080/books/1",
        reviewed_book
      );
    });
  });

  // comment out for same reason as other comment outs
  // it("Update a review for a book", () => {
  //   const review = {
  //     name: "Ihechi Festus",
  //     content: "Excellent work boss!",
  //   };

  //   axios.get = jest
  //     .fn()
  //     .mockImplementation(() => Promise.resolve({ data: book }));

  //   axios.put = jest.fn().mockImplementation(() => Promise.resolve({}));

  //   const store = mockStore({ list: { books: [], term: [] } });

  //   return store.dispatch(updateReview(1, review)).then(() => {
  //     expect(axios.put).toHaveBeenCalledWith(
  //       "http://localhost:8080/reviews/1",
  //       review
  //     );
  //   });
  // });
});
