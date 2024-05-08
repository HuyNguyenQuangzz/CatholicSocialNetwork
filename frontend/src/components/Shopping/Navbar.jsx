import { useRecoilValue } from "recoil";
import {
  totalAmountSelector,
  totalItemCountSelector,
} from "../../atoms/cartAtom";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  const totalItemCount = useRecoilValue(totalItemCountSelector);
  const totalAmount = useRecoilValue(totalAmountSelector);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Flex align="center" justify="flex-end">
        <Badge
          // colorScheme="red"
          fontSize="0.9em"
          ml="auto"
          mf={20} // optional margin right
          pb={7}
          color={"red"}
        >
          {totalItemCount}
        </Badge>

        <Link as={RouterLink} to="/cart">
          <FaShoppingCart
            size={30}
            sx={{ color: "white", cursor: "pointer" }}
            // onClick={} // Optional: Add onClick handler
          />
        </Link>

        <Text ml={2} mr={4}>
          Total: ${totalAmount}
        </Text>
      </Flex>
    </Box>
  );
}
