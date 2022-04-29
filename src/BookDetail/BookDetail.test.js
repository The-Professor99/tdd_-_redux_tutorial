import React from "react";
import { render } from "@testing-library/react";
import BookDetail from "./BookDetail";
import store from "../store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

const renderWithProvider = (component) => {
  return { ...render(<Provider store={store}>{component}</Provider>) };
};
describe("BookDetail", () => {
  it("loading", () => {
    const props = {
      loading: true,
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const content = container.querySelector("p");
    expect(content.innerHTML).toContain("Loading");
  });

  it("error", () => {
    const props = {
      error: true,
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const content = container.querySelector("p");
    expect(content.innerHTML).toContain("Error");
  });

  it("render a book", () => {
    const props = {
      book: { name: "Refactoring", id: 1 },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const title = container.querySelector("h2");
    expect(title.innerHTML).toEqual("Refactoring");
  });
  it("render description", () => {
    const props = {
      book: {
        name: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques " +
          "that hundreds of thousands of developers have used to improve " +
          "their software.",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.description);
  });
  it("displays the book name when no description was given", () => {
    const props = {
      book: {
        name: "Refactoring",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);

    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.name);
  });
  it("renders reviews", () => {
    const props = {
      book: {
        name: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.",
        reviews: [
          {
            name: "Juntao",
            date: "2018/06/21",
            content: "Excellent Work, really impressed by your efforts",
          },
        ],
      },
    };

    const { container } = renderWithProvider(<BookDetail {...props} />);
    const reviews = container.querySelectorAll(
      '[data-test="reviews-container"] .review'
    );
    expect(reviews.length).toBe(1);
    expect(reviews[0].querySelector(".name").innerHTML).toEqual("Juntao");
  });

  it("renders review form", () => {
    const props = {
      book: {
        name: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.",
      },
    };

    const { container } = renderWithProvider(<BookDetail {...props} />);

    const form = container.querySelector("form");
    const nameInput = container.querySelector('input[name="name"]');
    const contentTextArea = container.querySelector('textarea[name="content"]');
    const submitButton = container.querySelector('button[name="submit"]');

    expect(form).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(contentTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
