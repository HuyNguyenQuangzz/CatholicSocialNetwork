import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
// import UserManager from "./UserManager";
import { Link as RouterLink } from "react-router-dom";

// import NewProduct from "./Product/NewProduct";

const Admin = () => {
  return (
    <Box p="4">
      <Heading textAlign={"center"} as="h1" size="lg" mb="4">
        Admin Dashboard
      </Heading>

      <Flex mb="4" justifyContent="center">
        <Link as={RouterLink} to="/admin/userManager">
          <Button colorScheme="blue" mx="2">
            Users
          </Button>
        </Link>
        <Link as={RouterLink} to="/admin/productManager">
          <Button colorScheme="green" mx="2">
            Products
          </Button>
        </Link>
        <Link as={RouterLink} to="/admin/orderManager">
          <Button colorScheme="purple" mx="2">
            Orders
          </Button>
        </Link>
      </Flex>
      {/* Add more components and functionality as needed */}
      {/* <UserManager /> */}
      {/* <NewProduct/> */}
    </Box>
  );
};

export default Admin;
