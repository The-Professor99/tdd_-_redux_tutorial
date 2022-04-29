import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import SearchBox from "./SearchBox";

const renderWithRouter = (component) => {
  return {
    ...render(component, { wrapper: Router }),
  };
};

describe("SearchBox", () => {
  it("checks input", () => {
    const { container } = renderWithRouter(<SearchBox />);
    const input = container.querySelector('input[type="text"]');
    userEvent.type(input, "domain");
    expect(input).toHaveValue("domain");
  });
});
