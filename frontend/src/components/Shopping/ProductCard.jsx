// import React from 'react';
// import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

// const ProductCard = ({ product, addToCart }) => {
//   return (
//     <Card sx={{ maxWidth: 300, minHeight: 400, margin: 2, display: 'flex', flexDirection: 'column', position: 'relative', }}>
//       <CardContent sx={{ flex: '1 0 auto' }}>
//         <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '100%', maxHeight: 200 }} />
//          <Typography gutterBottom variant="h5" component="div">
//          <b>  {product.brand} </b>
//         </Typography>
//         <Typography gutterBottom variant="h5" component="div">
//           {product.title}
//         </Typography>
//         <Typography gutterBottom variant="h6" component="div">
//           <b> ${product.price} </b>
//         </Typography>
//          <Typography gutterBottom variant="body" component="div">
//           <b> Rating : {product.rating} / 5  </b>
//         </Typography>
//         {/* <Typography variant="body2" color="text.secondary">
//           {product.description}
//         </Typography> */}
//       </CardContent>
//       <CardActions sx={{ position: 'absolute', bottom: 0, width: '90%' }}>
//         <Button onClick={() => addToCart(product.id)} size="small" fullWidth variant="contained" color="primary">
//           Add to Cart
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default ProductCard;
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/cartAtom";

const ProductCard = ({ product }) => {
  const [cart, setCartState] = useRecoilState(cartState);

  function addToCart(product) {
    const existsItem = cart.find((item) => item.id === product.id);

    if (existsItem) {
      setCartState(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartState((items) => [
        ...items,
        { id: product.id, price: product.price, quantity: 1 },
      ]);
    }
    // console.log(cart);
  }

  return (
    <Card
      sx={{
        width: 300, 
        height: "auto",
        margin: 2,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: "1px solid #e0e0e0", 
        borderRadius: "8px", 
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", 
        backgroundColor: "#fffff",
      }}
    >
      <CardContent
        sx={{
          flex: "1 0 auto",
          alignItems: "center", 
          padding: "16px", 
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: "100%",
            maxHeight: 200,
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />

        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ marginBottom: 1, color: "#333333", fontWeight: "bold" }}
        >
          {product.brand}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "#333333", fontWeight: "bold" }}
        >
          {product.title}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "#009688", fontWeight: "bold" }}
        >
          ${product.price}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          sx={{ color: "#666666" }}
        >
          Rating: {product.rating}/5
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          padding: "8px",
          backgroundColor: "#f9f9f9", 
        }}
      >
        <Button
          onClick={() => addToCart(product)}
          size="small"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#009688",
            "&:hover": { backgroundColor: "#00796b" },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
