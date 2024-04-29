import { useEffect, useState } from "react";


import ProductCard from "./ProductCard";
import { useRecoilState } from "recoil";

import { productsState } from "../../atoms/productAtom";

import SearchBar from "./SearchBar";
import PriceFilter from "./PriceFilter";

const Home = () => {
  const [products, setProducts] = useRecoilState(productsState);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

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

  useEffect(() => {
    const getCourses = async () => {
      const token = localStorage.getItem("Auth");
      const response = await axios.get(
        "https://dummyjson.com/products?limit=0",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setProducts(response.data.products);
      //console.log(response.data.products);
    };

    getCourses();
  }, [setProducts]);

  useEffect(() => {
    const filtered = products
      .filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    setFilteredProducts(filtered);
  }, [products, searchQuery, minPrice, maxPrice]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "15vh",
        }}
      >
        <SearchBar onSearch={onSearch} />
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChange={handlePriceChange}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingTop: 2,
        }}
      >
        {
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })
          ) : (
            <p className="no-results">No results found, Please try again</p>
          )
          //  ( if(filteredProducts.length == 0 ){
          //         return (<p className="no-results">No results found for your query.</p>)
          //  }else
          //   products.map((product) => {
          //     return <ProductCard key={product.id} product={product} />;
          //   }))
        }
      </div>
    </div>
  );
};

export default Home;
