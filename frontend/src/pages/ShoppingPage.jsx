import { Card, CardBody, Container, Text } from "@chakra-ui/react";
// import Home from "../components/Shopping/Home";
// import PriceFilter from "../components/Shopping/PriceFilter";
// import SearchBar from "../components/Shopping/SearchBar";
// import Cart from "../components/Shopping/Cart";
import ProductCard from "../components/Shopping/ProductCard";

const ShoppingPage = () => {
  return (
    <Container maxW="container.lg" w={"full"}>
      <ProductCard />
    </Container>
  );
};

export default ShoppingPage;
