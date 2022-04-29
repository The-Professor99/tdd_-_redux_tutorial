import React from "react";
import { Review } from "./Review";
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

describe("Review", () => {
  it("editing", () => {
    const props = {
      review: {
        name: "Juntao",
        date: "2018/06/21",
        content: "Excellent work, really impressed by your efforts",
      },
    };

    const { getByText } = renderWithProvider(<Review {...props} />);
    const button = getByText("Edit");

    expect(button.innerHTML).toEqual("Edit");

    userEvent.click(button);
    expect(button.innerHTML).toEqual("Submit");
  });

  it("copy content to a textarea for editing", () => {
    const props = {
      review: {
        name: "Juntao",
        date: "2018/06/21",
        content: "Excellent work, really impressed by your efforts",
      },
    };
    const { getByText, container } = renderWithProvider(<Review {...props} />);
    const button = getByText("Edit");
    const content = container.querySelector("p.content");
    const editingContent = container.querySelector('textarea[name="content"]');
    expect(content).toBeInTheDocument();
    expect(
      container.querySelector('textarea[name="content"]')
    ).not.toBeInTheDocument();
    userEvent.click(button);
    expect(content).not.toBeInTheDocument();
    expect(
      container.querySelector('textarea[name="content"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('textarea[name="content"]').innerHTML
    ).toEqual("Excellent work, really impressed by your efforts");
  });

  // it('Sends requests', async () => {
  //   const fakeUpdateReview = () => {
  //     return () => {
  //       return Promise.resolve({})
  //     }
  //   };

  //   jest.spyOn(actions, 'updateReview').mockImplementation(() => fakeUpdateReview);

  //   const props = {
  //     reviews: [{
  //       id: 1,
  //       name: 'Ihechi Festus',
  //       date: '2018/06/21',
  //       content: 'Excellent work, really impressive on the efforts you put'
  //     }],
  //   };

  //   const {getByText, container} = renderWithProvider(<ReviewList {...props} />);

  //   userEvent.click(getByText('Edit'));

  //   const content = container.querySelector('textarea[name="content"]');
  //   userEvent.type(content, 'Fantastic work');

  //   userEvent.click(getByText('Submit'));

  //   expect(actions.updateReview).toHaveBeenCalledWith(123, {...props[0].review, content: 'Fantastic work'});
  // });
});
