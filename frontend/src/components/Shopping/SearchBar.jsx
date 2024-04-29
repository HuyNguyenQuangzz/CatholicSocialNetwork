import React from "react";
import TextField from "@mui/material/TextField";

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      onChange={handleChange}
      width="900"
      style={{
        marginRight: 25,
        // marginTop: "15vh",
        width: 900,
        //border: "1px solid #7e84b6",
        borderRadius: 10,
      }}
    />
  );
};

export default SearchBar;
