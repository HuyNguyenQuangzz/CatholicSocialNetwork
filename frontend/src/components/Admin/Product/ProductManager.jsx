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
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { GrView } from "react-icons/gr";
const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products/get-all");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prid: "123",
          prname: "test",
          prtype: "test",
          status: "test",
          description: "test",
          effectiveDate: "test",
          expirationDate: "test",
        }),
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

      <Button
        variant="outline"
        mt={4}
        colorScheme="blue"
        // onClick={handleOpen}
      >
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
            {/* {products.map((products) => (
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
            ))} */}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductManager;
