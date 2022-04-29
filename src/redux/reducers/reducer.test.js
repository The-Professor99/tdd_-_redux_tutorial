import booksReducer from "./books";
import details from "./details";
import search from "./search";
import {
  SET_SEARCH_TERM,
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ENDED,
} from "../types";

describe("Reducer", () => {
  it("Show loading when request is sent", () => {
    const initState = { loading: false };

    const action = { type: FETCH_BOOKS_PENDING };
    const state = booksReducer(initState, action);
    expect(state.loading).toBeTruthy();
  });

  it("Add books to state when request is successful", () => {
    const payload = [
      { id: 1, name: "Refactoring" },
      { id: 2, name: "Domain-driven design" },
    ];
    const action = {
      type: FETCH_BOOKS_SUCCESS,
      payload,
    };
    const state = booksReducer({}, action);

    expect(state.books).toEqual(payload);
  });

  it("Not Show loading after request is completed", () => {
    const initState = { loading: true };

    const action = { type: FETCH_BOOKS_ENDED };
    const state = booksReducer(initState, action);

    expect(state.loading).not.toBeTruthy();
  });
  it("Show error upon failure", () => {
    const initState = { error: false };

    const action = { type: FETCH_BOOKS_FAILED };

    const state = booksReducer(initState, action);

    expect(state.error).toBeTruthy();
  });

  it("Sets search term", () => {
    const payload = "domain";

    const action = { type: SET_SEARCH_TERM, payload };
    const state = search("", action);
    expect(state.term).toEqual(payload);
  });
});
