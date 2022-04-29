const books = [
  {
    id: 1,
    name: "ihechi",
    reviews: [],
  },
  {
    id: 2,
    name: "ihechi",
    reviews: [],
  },
  {
    id: 3,
    name: "ihechi",
    reviews: [],
  },
  {
    id: 4,
    name: "ihechi",
    reviews: [],
  },
];

const find = async (arg) => {
  books.find((book, index) => {
    if (book.id === arg) {
      console.log(book.reviews);
      book.reviews.push("reviewed");
    } else {
      return false;
    }
  });
};

find(1);
