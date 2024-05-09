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
  let [loading, setLoading] = useState(true);
  const handlePriceChange = (newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const onSearch = (value) => {
    setSearchQuery(value);
  };
  useEffect(() => {
    // Gửi yêu cầu API để lấy danh sách sản phẩm
    fetch("/api/products/list")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
    // setProducts(response.data.products);
  }, [setProducts]);

  // handle search product


  return (
    <>
      <Navbar />

      <Carousel />

      <Container>
        {/* <Heading>Cart</Heading> */}

        <Flex>
          <Heading pr={2}>Search</Heading>
          <SearchBar onSearch={onSearch} />
          {/* <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onChange={handlePriceChange}
          /> */}
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
