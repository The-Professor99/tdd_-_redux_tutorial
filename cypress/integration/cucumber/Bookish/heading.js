import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import {
  checkAppTitle,
  checkBookListWith,
  gotoApp,
  performSearch,
  composeReview,
  checkReview,
  gotoNthBookInTheList,
} from "../../../helpers";

Given(`I am a bookish user`, () => {
  console.log("Yes i am a user");
});

When(`I open the list page`, () => {
  console.log("Yes i can log in");
  gotoApp();
});

Then(`I can see the title {string} is showing`, (title) => {
  console.log(title);
  checkAppTitle(title);
});

And(`there is a book list`, (table) => {
  const actual = table.rows().map((x) => x[0]);
  console.log(actual);
  checkBookListWith(actual);
});

And(`I typed {string} to perform a Search`, (term) => {
  performSearch(term);
});

Then(`I should see {string} is matched`, (book) => {
  checkBookListWith([book]);
});

When(`I open the book detail page for the first item`, () => {
  gotoNthBookInTheList(0);
});

And(`I add a review to that book`, (table) => {
  const reviews = table.hashes();
  const review = reviews[0];
  composeReview(review.name, review.content);
});

Then(
  `I can see it displayed beneath the description section with the text {string}`,
  (content) => {
    checkReview(content);
  }
);
