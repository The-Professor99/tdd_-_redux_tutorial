import { render } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import BooklistContainer from "./BooklistContainer";
import axios from "axios";
import { Provider } from "react-redux";

import { MemoryRouter as Router } from "react-router-dom";
import store from "../store";

const renderWithProvider = (component) => {
  return {
    ...render(
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    ),
  };
};
describe("Booklist container", () => {
  it("renders", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:8080/books?q=").reply(200, [
      { name: "Refactoring", id: 1 },
      { name: "Acceptance tests driven development with React", id: 2 },
    ]);
    const { findByText } = renderWithProvider(<BooklistContainer />);

    const book1 = await findByText("Refactoring");
    const book2 = await findByText(
      "Acceptance tests driven development with React"
    );

    expect(book1).toBeInTheDocument();
    expect(book2).toBeInTheDocument();
  });
  //   it("something went wrong", async () => {
  //     const mock = new MockAdapter(axios);
  //     mock.onGet("http://localhost:8080/books?q=").networkError();
  //     const { findByText } = renderWithProvider(<BooklistContainer />);
  //     const error = await findByText("Error, Cannot Retrieve items!");

  //     expect(error).toBeInTheDocument();
  //   });
});
