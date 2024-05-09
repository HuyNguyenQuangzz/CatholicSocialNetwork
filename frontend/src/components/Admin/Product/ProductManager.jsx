// product manager component with CURD product (Chakra UI, Recoil)
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

// import { productState } from "../../../atoms/productAtom";
import { useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Spinner,
  Button,
  Heading,
  Input,
  TableContainer,
  Table,
  Thead,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { GrView } from "react-icons/gr";
const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
    discount: "",
  });
  const [isOpen, setIsOpen] = useState(false); // state for modal visibility
  const onClose = () => setIsOpen(false); // function to close modal

  const handleOpen = () => setIsOpen(true); // function to open modal
  const [inputErrors, setInputErrors] = useState({});

  // get list product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products/list");
        // const data = await response.json();
        setProducts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateNewProduct = async () => {
    try {
      const response = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
        // body: JSON.stringify({
          // name: inputs.name,
          // image: inputs.image,
          // type: inputs.type,
          // price: inputs.price,
          // countInStock: inputs.countInStock,
          // rating: inputs.rating,
          // description: inputs.description,
          // discount: inputs.discount,
        // }),
      });
      const data = await response.json();
      setProducts([...products, data]);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="80vh">
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    // return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Heading textAlign={"center"}>Products Management</Heading>

      <Button variant="outline" mt={4} colorScheme="blue" onClick={handleOpen}>
        Create New Product
      </Button>

      <Box mt={5}>
        <Input
          placeholder="Search Product by name"
          // value={searchInput}
          // onChange={(e) => setSearchInput(e.target.value)}
          // onKeyPress={handleKeyPress}
        />

        <Button
        // onClick={handleSearch} ml={2}
        >
          Search
        </Button>
      </Box>

      <TableContainer>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Count In Stock</Th>
              {/* <Th>Date of birth</Th> */}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((products) => (
              <Tr key={products._id}>
                <Td>{products.name}</Td>
                <Td>{products.price}</Td>
                <Td>{products.countInStock}</Td>

                <Td>
                  <Button
                  // onClick={updateUser}
                  >
                    <RxUpdate />
                  </Button>

                  <Button>
                    <AiOutlineDelete />
                  </Button>

                  <Button>
                    <GrView />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Create a new product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Create a New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter name of product"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="type" isRequired>
                <FormLabel>Type</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter type"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, ""); // Remove spaces
                    setInputs({ ...inputs, type: value });
                  }}
                />
              </FormControl>

              <FormControl id="price" isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter price"
                  onChange={(e) =>
                    setInputs({ ...inputs, price: e.target.value })
                  }
                  value={inputs.price}
                />
              </FormControl>

              <FormControl isRequired isInvalid={inputErrors.countInStock}>
                <FormLabel>Count In Stock</FormLabel>
                <Input
                  placeholder="Enter Count In Stock"
                  onChange={(e) =>
                    setInputs({ ...inputs, countInStock: e.target.value })
                  }
                  type="number"
                  value={inputs.countInStock}
                />
                <FormErrorMessage>{inputErrors.countInStock}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Rating</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter Rating."
                  value={inputs.rating}
                  onChange={(e) =>
                    setInputs({ ...inputs, rating: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Discount</FormLabel>
                <Input
                  placeholder="Enter discount"
                  value={inputs.phone}
                  onChange={(e) =>
                    setInputs({ ...inputs, discount: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="number"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Description..."
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs({ ...inputs, description: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleCreateNewProduct}>
              Create Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductManager;
