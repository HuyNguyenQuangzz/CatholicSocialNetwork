import { Box, Heading } from "@chakra-ui/react";
import { Pie, Bar } from "@chakra-ui/react-chart";
import axios from "axios";
import { useState, useEffect } from "react";

const Chart = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await axios.get("/api/users/count");
      const orderRes = await axios.get("/api/orders/count");
      setPieChartData([
        { label: "Users", data: userRes.data.count },
        { label: "Orders", data: orderRes.data.count },
      ]);
      setBarChartData([
        {
          label: "Users",
          data: Array.from({ length: userRes.data.count }, () =>
            Math.floor(Math.random() * 100)
          ),
        },
        {
          label: "Orders",
          data: Array.from({ length: orderRes.data.count }, () =>
            Math.floor(Math.random() * 100)
          ),
        },
      ]);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Heading fontSize="2xl" fontWeight="bold" mb="4">
        Chart
      </Heading>
      <Box mb="4">
        <Pie data={pieChartData} />
      </Box>
      <Box>
        <Bar data={barChartData} />
      </Box>
    </Box>
  );
};

export default Chart;
