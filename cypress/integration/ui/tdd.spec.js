// tdd.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:

import axios from "axios";

// improving readability;

const gotoApp = () => {
  cy.visit("http://localhost:3000/");
};
const gotoNthBook = (n) => {
  cy.get("div.book-item").contains("View Details").eq(n).click();
  cy.url().should("include", `/books/${n + 1}`);
};
const checkBookDetail = (detail) => {
  cy.get("h2.book-title").contains(detail);
};
// https://on.cypress.io/writing-first-test
describe("Bookish application", function () {
  // before(() => {
  //   return axios
  //     .delete("http://localhost:8080/books?_cleanup=true")
  //     .catch((err) => err);
  // });

  // afterEach(() => {
  //   return axios
  //     .delete("http://localhost:8080/books?_cleanup=true")
  //     .catch((err) => err);
  // });

  // beforeEach(() => {
  //   const books = [
  //     { name: "Refactoring", id: 1 },
  //     { name: "Domain-driven design", id: 2 },
  //     { name: "Building Microservices", id: 3 },
  //   ];

  //   return books.reverse().map((item) =>
  //     axios.post("http://localhost:8080/books", item, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //   );
  // });

  // after(() => {
  //   console.log("hey");
  //   const books = [
  //     { name: "Refactoring", id: 1 },
  //     { name: "Domain-driven design", id: 2 },
  //     { name: "Building Microservices", id: 3 },
  //   ];

  //   return books.forEach((item) =>
  //     axios.post("http://localhost:8080/books", item, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //   );
  // });

  it("Visits the bookish", function () {
    gotoApp();
    cy.get('h2[data-test="heading"]').contains("Bookish");
  });
  it("Shows a book list", () => {
    gotoApp();
    cy.get('div[data-test="book-list"]').should("exist");
    // cy.get("div.book-item").should("have.length", 2);
    cy.get("div.book-item").should((books) => {
      expect(books).to.have.length(4);

      const titles = [...books].map((x) => x.querySelector("h2").innerHTML);
      expect(titles).to.deep.equal([
        "Refactoring",
        "Domain-driven design",
        "Building Microservices",
        "Acceptance Test Driven Development with React",
      ]);
    });
  });

  it("Goes to the detail page", () => {
    gotoApp();
    gotoNthBook(0);
    checkBookDetail("Refactoring");
  });

  it("Searches for a title", () => {
    gotoApp();
    cy.get("div.book-item").should("have.length", 4);
    cy.get('[data-test="search"] input').type("design");
    cy.get("div.book-item").should("have.length", 1);
    cy.get("div.book-item").eq(0).contains("Domain-driven design");
  });

  it("Removes whitespace from title search", () => {
    gotoApp();
    cy.get("div.book-item").should("have.length", 4);
    cy.get('[data-test="search"] input').type("   driven   design   ");
    cy.get("div.book-item").should("have.length", 1);
    cy.get("div.book-item").eq(0).contains("Domain-driven design");
  });

  it("Write a review for a book", () => {
    gotoApp();
    gotoNthBook(0);
    checkBookDetail("Refactoring");

    cy.get('input[name="name"]').type("Ihechi Festus");
    cy.get('textarea[name="content"]').type("Excellent work!");
    cy.get('button[name="submit"].review-submit').click();

    cy.get('div[data-test="reviews-container"] .review').should(
      "have.length",
      1
    );
  });
});
