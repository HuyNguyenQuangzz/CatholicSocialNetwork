import React from "react";
import {
  Box,
  // Center,
  Image,
  // Flex,
  // Badge,
  Text,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  Stack,
  Heading,
  // Divider,
  CardFooter,
  ButtonGroup,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
// import { MdStar } from "react-icons/md";
import { cartState } from "../../atoms/cartAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
// import { productsState } from "../../atoms/productAtom";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const [cart, setCartState] = useRecoilState(cartState);
  // const [products, setProducts] = useRecoilState(productsState);
  const [products, setProducts] = useState([]);
  // const [product, setProductState] = useRecoilState(productsState);

  useEffect(() => {
    // Gửi yêu cầu API để lấy danh sách sản phẩm
    fetch("/api/products/list")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (product) => {
    // Concise logic for adding item with quantity update
    const newItem = { ...product, quantity: 1 };
    const exists = cart.find((item) => item.id === product.id);
    setCartState(
      exists ? updateCartWithQuantity(cart, newItem) : [...cart, newItem]
    );
  };

  const updateCartWithQuantity = (cart, newItem) => {
    return cart.map((item) => (item.id === newItem.id ? newItem : item));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct("");
    setIsOpen(false);
  };

  //handle setShowMore(!showMore)} for show description
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(!showMore); // Toggle showMore state
  };

  return (
    <>
      {/* <Center h="100vh" w="full" mt={100}> */}
      {/* <Link to={`/productDetail/${products._id}`}> */}
      <Grid templateColumns="repeat(4, 1fr)" gap={2} mb={5}>
        {products.map((product) => (
          <GridItem key={product._id} colSpan={1}>
            <Card maxW="sm" mt={1}>
              {/* <Link to={`/product/${product._id}`}> */}
              <CardBody
                onClick={() => handleOpenModal(product)}
                cursor={"pointer"}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  borderRadius="lg"
                  mt={-3}
                  // marginLeft={-2}
                  // marginRight={-2}
                />
                <Stack mt="1" spacing="1">
                  <Heading size="md" textAlign={"center"}>
                    {product.name}
                  </Heading>
                  <Box>
                    <Text fontSize="3xl">${product.price} </Text>
                    <Text textAlign={"right"} fontSize="xl">
                      {product.rating}⭐ | {product.countInStock}🏘 |{" "}
                      {product.selled}🪂
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
              {/* </Link> */}
              {/* <Divider /> */}
              <CardFooter mt={-7}>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    Buy now
                  </Button>
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    // onClick={() => handleAddToCart(products)}
                  >
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>
      {/* </Link> */}
      {/* </Center> */}

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="3xl">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>{selectedProduct && selectedProduct.name}</ModalHeader> */}
          <ModalHeader textAlign={"center"}>Product Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              // height={200} w={"full"}
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
            <Text fontSize="5xl" textAlign={"center"} pt={3}>
              Name: {selectedProduct.name}
            </Text>
            <Text fontSize="3xl">Price: ${selectedProduct.price}.00 USD</Text>
            <Text fontSize="2xl">Material: {selectedProduct.type}</Text>
            <Text fontSize="2xl">Rating: {selectedProduct.rating}⭐</Text>
            <Text fontSize="2xl">Discount: {selectedProduct.discount}✨</Text>

            <Text>
              Description:{" "}
              {selectedProduct.description &&
                (showMore
                  ? selectedProduct.description
                  : selectedProduct.description.length > 50
                  ? selectedProduct.description.slice(0, 50)
                  : selectedProduct.description)}
              {selectedProduct.description &&
                selectedProduct.description.length > 50 && (
                  <Button variant="link" color="blue" onClick={handleShowMore}>
                    {showMore ? "  Less" : "  More"}
                  </Button>
                )}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              // onClick={handleAddToCart(selectedProduct)}
            >
              Add to Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;