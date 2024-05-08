import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
// import { productState } from "../../../../recoil/product";
// import { productState } from "../../../atoms/productAtom";
import { productState } from "../../../atoms/productAtom";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function NewProduct() {
  const [products, setProducts] = useRecoilState(productState);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
      discount,
    };
    setProducts([...products, newProduct]);
    setName("");
    setImage("");
    setType("");
    setCountInStock(0);
    setPrice(0);
    setRating(0);
    setDescription("");
    setDiscount(0);
  };

  return (
    <Box
      p={5}
      border={"1px"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Stack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </FormControl>
        <FormControl id="image" isRequired>
          <FormLabel>Image</FormLabel>
          <Input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image"
          />
        </FormControl>
        <FormControl id="type" isRequired>
          <FormLabel>Type</FormLabel>
          <Input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter type"
          />
        </FormControl>
        <FormControl id="countInStock" isRequired>
          <FormLabel>Count In Stock</FormLabel>
          <Input
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(parseInt(e.target.value))}
            placeholder="Enter countInStock"
          />
        </FormControl>
        <FormControl id="price" isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            placeholder="Enter price"
          />
        </FormControl>
        <FormControl id="rating" isRequired>
          <FormLabel>Rating</FormLabel>
          <Input
            type="number"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            placeholder="Enter rating"
          />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </FormControl>
        <FormControl id="discount" isRequired>
          <FormLabel>Discount</FormLabel>
          <Input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(parseInt(e.target.value))}
            placeholder="Enter discount"
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
