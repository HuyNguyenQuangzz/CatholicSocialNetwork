import { Box, Link, Tooltip } from "@chakra-ui/react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { Link as RouterLink } from "react-router-dom";

const Settings = () => {
  return (
    <Tooltip
      hasArrow
      label={"Profile"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        as={RouterLink}
        to={`/shopping`}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        {/* <Avatar size={"sm"} src={authUser?.profilePic || ""} /> */}
        <LiaShoppingBagSolid size={24} />
        <Box display={{ base: "none", md: "block" }}>Shopping</Box>
      </Link>
    </Tooltip>
  );
};

export default Settings;
