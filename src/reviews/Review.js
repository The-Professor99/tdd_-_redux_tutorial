import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { TextField, Grid, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateReview } from "../redux/actions/actions";

export const Review = ({ review, id }) => {
  const [editing, setEditing] = useState(false);

  const [content, setContent] = useState(review.content);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (editing) {
      dispatch(updateReview(review.id, { content }, id));
    }

    setEditing(!editing);
  };
  return (
    <>
      {!editing ? (
        <div className="review">
          <Typography className="name">{review.name}</Typography>
          <Typography className="date">{review.date}</Typography>
          <Typography className="content">{review.content}</Typography>
        </div>
      ) : (
        <TextField
          name="content"
          label="Content"
          margin="normal"
          variant="outlined"
          multiline
          maxRows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        name="submit"
        onClick={() => clickHandler()}
      >
        {!editing ? "Edit" : "Submit"}
      </Button>
    </>
  );
};
