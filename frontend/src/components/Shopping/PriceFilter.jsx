// import React from "react";
// import Slider from "@mui/material/Slider";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// const PriceFilter = ({ minPrice, maxPrice, onChange }) => {
//   const handleChange = (event, newValue) => {
//     onChange(newValue);
//   };
//   const handleMinInputChange = (event) => {
//     const value = event.target.value === "" ? 0 : Number(event.target.value);
//     onChange([value, maxPrice]);
//   };

//   const handleMaxInputChange = (event) => {
//     const value = event.target.value === "" ? 1000 : Number(event.target.value);
//     onChange([minPrice, value]);
//   };

//   return (
//     <Box sx={{ ml: 10 }}>
//       <Typography id="price-range-slider" variant="h5" gutterBottom>
//         <strong> Price Filter</strong>
//       </Typography>
//       <Slider
//         value={[minPrice, maxPrice]}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         min={0}
//         max={1000}
//         aria-labelledby="price-range-slider"
//       />
//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//         <TextField
//           label="Min Price"
//           type="number"
//           value={minPrice}
//           onChange={handleMinInputChange}
//           inputProps={{ min: 0, max: 1000 }}
//         />
//         <TextField
//           label="Max Price"
//           type="number"
//           value={maxPrice}
//           onChange={handleMaxInputChange}
//           inputProps={{ min: 0, max: 1000 }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default PriceFilter;
import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const PriceFilter = ({ minPrice, maxPrice, onChange }) => {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleMinInputChange = (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    onChange([value, maxPrice]);
  };

  const handleMaxInputChange = (event) => {
    const value = event.target.value === "" ? 1000 : Number(event.target.value);
    onChange([minPrice, value]);
  };

  return (
    <Box sx={{ maxWidth: 300 }}>
      <Typography variant="h5" gutterBottom>
        <strong>Price Filter</strong>
      </Typography>
      <Slider
        value={[minPrice, maxPrice]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        aria-labelledby="price-range-slider"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <TextField
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={handleMinInputChange}
          inputProps={{ min: 0, max: 1000 }}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={handleMaxInputChange}
          inputProps={{ min: 0, max: 1000 }}
          variant="outlined"
          size="small"
        />
      </Box>
    </Box>
  );
};

export default PriceFilter;
