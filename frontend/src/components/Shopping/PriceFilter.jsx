import { Box, Slider, Text } from "@chakra-ui/react";

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
      <Text variant="h5" gutterBottom>
        <strong>Price Filter</strong>
      </Text>
      <Slider
        value={[minPrice, maxPrice]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        aria-labelledby="price-range-slider"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Text
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={handleMinInputChange}
          inputProps={{ min: 0, max: 1000 }}
          variant="outlined"
          size="small"
        />
        <Text
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
