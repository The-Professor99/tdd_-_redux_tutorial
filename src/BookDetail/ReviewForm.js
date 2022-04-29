import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, TextField } from "@material-ui/core";

import { saveReview } from "../redux/actions/actions";

function ReviewForm({ id }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  return (
    <form noValidate autoComplete="off">
        
      <TextField
        label="Name"
        name="name"
        margin="normal"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
        
      <TextField
        name="content"
        label="Content"
        margin="normal"
        variant="outlined"
        multiline
        maxRows="4"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
        
      <Button
        variant="contained"
        color="primary"
        name="submit"
        className="review-submit"
        onClick={() => dispatch(saveReview(id, { name, content }))}
      >
        Submit
      </Button>
    </form>
  );
}

export default ReviewForm;
