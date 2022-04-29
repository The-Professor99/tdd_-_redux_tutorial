import React from "react";
import { render } from "@testing-library/react";
import Booklist from "./Booklist";
import { MemoryRouter as Router } from "react-router-dom";

const renderWithRouter = (component) => {
  return { ...render(component, { wrapper: Router }) };
};

describe("Booklist", () => {
  it("loading", () => {
    const props = {
      loading: true,
    };
    const { container } = renderWithRouter(<Booklist {...props} />);
    const content = container.querySelector("p");
    expect(content.innerHTML).toContain("Loading");
  });

  it("error", () => {
    const props = {
      error: true,
    };
    const { container } = renderWithRouter(<Booklist {...props} />);
    const content = container.querySelector("p");
    expect(content.innerHTML).toContain("Error");
  });

  it("render books", () => {
    const props = {
      books: [
        { name: "Refactoring", id: 1 },
        { name: "Domain-driven design", id: 2 },
      ],
    };
    const { container } = renderWithRouter(<Booklist {...props} />);
    const titles = [...container.querySelectorAll("h2")].map(
      (x) => x.innerHTML
    );
    expect(titles).toEqual(["Refactoring", "Domain-driven design"]);
  });
});
