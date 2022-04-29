import React from "react";
import ReviewList from "./ReviewList";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import store from "../store";
import { Provider } from "react-redux";

const renderWithProvider = (component) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("ReviewList", () => {
  it("renders an empty list", () => {
    const props = {
      reviews: [],
    };

    const { container } = renderWithProvider(<ReviewList {...props} />);
    const reviews = container.querySelector('[data-test="reviews-container"]');

    expect(reviews).toBeInTheDocument();
  });
  it("renders a list when data is passed", () => {
    const props = {
      reviews: [
        {
          name: "Ihechi",
          date: "2018/06/21",
          content: "Excellent work, really impressed by your efforts",
        },
        { name: "Shemaiah", date: "2018/06/22", content: "What a great book" },
      ],
    };

    const { container } = renderWithProvider(<ReviewList {...props} />);
    const reviews = container.querySelectorAll(".review");
    expect(reviews.length).toBe(2);
    expect(reviews[0].querySelector(".name").innerHTML).toEqual("Ihechi");
    expect(reviews[0].querySelector(".date").innerHTML).toEqual("2018/06/21");
    expect(reviews[0].querySelector(".content").innerHTML).toEqual(
      "Excellent work, really impressed by your efforts"
    );
  });
});
