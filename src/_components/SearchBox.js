import React from "react";
import { TextField } from "@material-ui/core";
import { useSearchParams } from "react-router-dom";

function SearchBox() {
  let [searchParams, setSearchParams] = useSearchParams();

  //   const protect = (event) => {
  //     const value = clone(event.target.value);
  //     if (!isEmpty(value.trim())) {
  //       return onSearch(event);
  //     }
  //   };

  return (
    <TextField
      label="Search..."
      value={searchParams.get("q") || ""}
      data-test="search"
      onChange={(event) => {
        let q = event.target.value;
        if (q) {
          setSearchParams({ q });
        } else {
          setSearchParams({});
        }
      }}
      margin="normal"
      variant="outlined"
    />
  );
}

export default SearchBox;
