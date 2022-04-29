import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../styles";
import { Link, useSearchParams } from "react-router-dom";

const displayBook = (book, classes) => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.name}
          >
            {book.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}
          >
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={`/books/${book.id}`}>View Details</Link>
        </Button>
      </CardActions>
    </Card>
  );
};
function Booklist({ loading, error, books }) {
  const classes = useStyles();
  let [searchParams, setSearchParams] = useSearchParams();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error || !books) {
    return <p>Error, Cannot Retrieve items!</p>;
  }

  return (
    <div data-test="book-list" className={classes.root}>
      <Grid container spacing={3}>
        {books
          .filter((book) => {
            let filter = searchParams.get("q");
            if (!filter) return true;
            let name = book.name.toLowerCase();
            return name.includes(
              filter.split(" ").filter(Boolean).join(" ").toLowerCase()
            );
          })
          .map((book) => (
            <Grid item xs={4} sm={4} key={book.id} className="book-item">
              {displayBook(book, classes)}
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Booklist;
