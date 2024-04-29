import { Card, CardBody, Text } from "@chakra-ui/react";
// import Home from "../components/Shopping/Home";
// import PriceFilter from "../components/Shopping/PriceFilter";
// import SearchBar from "../components/Shopping/SearchBar";
// import Cart from "../components/Shopping/Cart";
import ProductCard from "../components/Shopping/ProductCard";

const ShoppingPage = () => {
  return (
    <Card>
      <CardBody>
        <Text>Hello this is the shopping page</Text>
        {/* <Home />
        <PriceFilter />
        <SearchBar />
        <Cart /> */}
        <ProductCard />
      </CardBody>
    </Card>
  );
};

export default ShoppingPage;
