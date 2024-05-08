import React from "react";
import {
  Box,
  useDisclosure,
  VStack,
  Grid,
  theme,
  Text,
  Flex,
  HStack,
  Spacer,
  Button,
  IconButton,
  Input,
  FormLabel,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleQuantityChange = (product, quantity) => {
    // Update product quantity in state
  };

  const product = [
    { id: 1, name: "LCD1602 Xanh Lá 5V", price: 50000, quantity: 1 },
    {
      id: 2,
      name: "Card màn hinh Colorful RIX 308011 Adv...",
      price: 49900000,
      quantity: 15,
    },
    {
      id: 3,
      name: "Ram DDR4 Kingston 32G/3200 HyperX F....",
      price: 5000000,
      quantity: -2,
    },
  ];

  // const subtotal = items.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );
  // const shippingCost = calculateShippingCost(subtotal);
  // const total = subtotal + shippingCost;

  // const calculateShippingCost = (subtotal) => {
  //   if (subtotal < 200000) {
  //     return 20000;
  //   } else if (subtotal >= 200000 && subtotal < 500000) {
  //     return 0;
  //   } else {
  //     return freeShipping;
  //   }
  // };

  // const freeShipping = 0;

  return (
    <>
      <Heading as="h2" fontSize={"4xl"}>
        Your Cart
      </Heading>

      <TableContainer pt={5} pb={5}>
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Unit Price</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{product.name}</Td>
              <Td>{product.price} USD</Td>
              <Td isNumeric>25</Td>
              <Td isNumeric>25.4 USD</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr></Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      {/* <Box mb={8}>
        <VStack spacing={4}>
          {product.map((item) => (
            <Grid key={item.id} templateColumns="repeat(5, 1fr)">
              <Box colSpan={1}>
                <Text>{item.name}</Text>
              </Box>
              <Box colSpan={1}>
                <Text>
                  {item.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </Box>
              <Box colSpan={1}>
                <HStack>
                  <Button
                    size="xs"
                    onClick={() =>
                      handleQuantityChange(item, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <Input
                    value={item.quantity}
                    size="xs"
                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                  />
                  <Button
                    size="xs"
                    onClick={() =>
                      handleQuantityChange(item, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </HStack>
              </Box>
              <Box colSpan={1}>
                <Text>
                  {Math.abs(item.quantity * item.price).toLocaleString(
                    "vi-VN",
                    { style: "currency", currency: "VND" }
                  )}
                </Text>
              </Box>
            </Grid>
          ))}
        </VStack>
      </Box> */}

      <Box as="h4" fontSize={theme.fontSizes.md}>
        Shipping Fee
      </Box>
      <Flex mb={4}>
        <Text>Shipping cost:</Text>
        <Spacer />
        <Text>
          {/* {shippingCost.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })} */}
        </Text>
      </Flex>
      <Box as="h4" fontSize={theme.fontSizes.md}>
        Giảm giá (Discount)
      </Box>
      <Flex mb={4}>
        <Text>Giảm giá (Discount):</Text>
        <Spacer />
        <Text>0 VND</Text>
      </Flex>
      <Flex mb={8}>
        <Text>Tổng tiền (Total):</Text>
        <Spacer />
        <Text fontWeight={theme.fontWeights.bold}>
          {/* {total.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })} */}
        </Text>
      </Flex>
      <Button onClick={onOpen}>Checkout</Button>
    </>
  );
};

export default Cart;
