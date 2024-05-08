import { Box, Divider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// handle get all order and show all order in system for admin using charka UI
const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Order Manager
        </Text>
        <Box>
          {/* {orders.map((order) => (
          <Box key={order.id} mb="4">
            <Text fontSize="lg" fontWeight="bold" mb="2">
              Order #{order.id}
            </Text>
            <Text>Date: {new Date(order.createdAt).toLocaleString()}</Text>
            <Text>Total: {order.totalPrice} VND</Text>
            <Text>
              User: {order.user.name} ({order.user.email})
            </Text>
            <Text>Address: {order.address}</Text>
            <Text>Phone: {order.phone}</Text>
            <Text>Status: {order.status}</Text>
            <Divider my="4" />
          </Box>
        ))} */}
        </Box>
      </Box>
    </>
  );
};

export default OrderManager;
