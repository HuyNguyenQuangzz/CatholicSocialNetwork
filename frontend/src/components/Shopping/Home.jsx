import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { useRecoilState } from "recoil";

import { productsState } from "../../atoms/productAtom";

import SearchBar from "./SearchBar";
import PriceFilter from "./PriceFilter";
import { Container, Flex, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar";
import AboutUs from "../AboutUs";
import Carousel from "./Carousel";

const Home = () => {
  const [products, setProducts] = useRecoilState(productsState);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // handle get all product with fetch API

  // .then((res) => res.

  const handlePriceChange = (newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const onSearch = (value) => {
    setSearchQuery(value);
    // const filtered = products.filter(
    //   (p) =>
    //     p.title.toLowerCase().includes(value.toLowerCase()) ||
    //     p.brand.toLowerCase().includes(value.toLowerCase())
    // );
    // setFilteredProducts(filtered);
  };

  // useEffect(() => {
  //   const filtered = products
  //     .filter(
  //       (product) =>
  //         product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter(
  //       (product) => product.price >= minPrice && product.price <= maxPrice
  //     );
  //   setFilteredProducts(filtered);
  // }, [products, searchQuery, minPrice, maxPrice]);

  return (
    <>
      <Navbar />

      <Carousel />  
      
      <Container>
        {/* <Heading>Cart</Heading> */}

        <Flex>
          <Heading>Search</Heading>
          <SearchBar onSearch={onSearch} />
          <PriceFilter
          // minPrice={minPrice}
          // maxPrice={maxPrice}
          // onChange={handlePriceChange}
          />
        </Flex>

        <Flex
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "full",
            justifyContent: "center",
            paddingTop: 2,
          }}
        >
          <Heading>Product List</Heading>
          <ProductCard />
        </Flex>
      </Container>
      <AboutUs />
    </>
  );
};

export default Home;
