// import * as React from "react";
import { Box, Center, Image, Flex, Badge, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";

export default function ProductCard() {
  const products = [
    // Define your products here
    {
      name: "ABC",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoSOmaMrmoacCX9W-G6ic5LIZqV7jxw7bmA&s",
      price: 119,
      rating: {
        value: 4.84,
        count: 190
      },
      location: "Cape Town"
    },
    {
      name: "X",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoSOmaMrmoacCX9W-G6ic5LIZqV7jxw7bmA&s",
      price: 119,
      rating: {
        value: 4.84,
        count: 190
      },
      location: "Cape Town"
    },{
      name: "HNC",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoSOmaMrmoacCX9W-G6ic5LIZqV7jxw7bmA&s",
      price: 119,
      rating: {
        value: 4.84,
        count: 190
      },
      location: "Cape Town"
    },
    {
      name: "MNS",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoSOmaMrmoacCX9W-G6ic5LIZqV7jxw7bmA&s",
      price: 119,
      rating: {
        value: 4.84,
        count: 190
      },
      location: "Cape Town"
    },
    {
      name: "QQQ",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoSOmaMrmoacCX9W-G6ic5LIZqV7jxw7bmA&s",
      price: 119,
      rating: {
        value: 4.84,
        count: 190
      },
      location: "Cape Town"
    },
    {
      name: "HUY",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoSOmaMrmoacCX9W-G6ic5LIZqV7jxw7bmA&s",
      price: 119,
      rating: {
        value: 4.84,
        count: 190
      },
      location: "Cape Town"
    },
    {
      name: "TT",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoSOmaMrmoacCX9W-G6ic5LIZqV7jxw7bmA&s",
      price: 119,
      rating: {
        value: 4.84,
        count: 190
      },
      location: "Cape Town"
    },
    {
      name: "HK",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoSOmaMrmoacCX9W-G6ic5LIZqV7jxw7bmA&s",
      price: 119,
      rating: {
        value: 4.84,
        count: 190
      },
      location: "Cape Town"
    },
    {
      name: "MH",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoSOmaMrmoacCX9W-G6ic5LIZqV7jxw7bmA&s",
      price: 119,
      rating: {
        value: 4.84,
        count: 190
      },
      location: "Cape Town"
    },
    // Add more products here
  ];

  const handleAddToCart = (product) => {
    // Add your logic here to handle adding the item to the cart
    alert(`${product.name} added to cart!`);
  };

  return (
    <Center h="100vh" w="full">
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      {products.map((product, index) => (
        <GridItem key={index} colSpan={1}>
          <Box p="5" borderWidth="1px">
            <Image borderRadius="md" src={product.image} />
            <Flex align="baseline" mt={2}>
              <Badge colorScheme="pink">Plus</Badge>
              <Text
                ml={2}
                textTransform="uppercase"
                fontSize="sm"
                fontWeight="bold"
                color="pink.800"
              >
                Verified &bull; {product.location}
              </Text>
            </Flex>
            <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
              {product.name}
            </Text>
            <Text mt={2}>${product.price}</Text>
            <Flex mt={2} align="center">
              <Box as={MdStar} color="orange.400" />
              <Text ml={1} fontSize="sm">
                <b>{product.rating.value}</b> ({product.rating.count})
              </Text>
            </Flex>
            <Button mt={4} colorScheme="blue" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Button>
          </Box>
        </GridItem>
      ))}
    </Grid>
  </Center>
  );
}