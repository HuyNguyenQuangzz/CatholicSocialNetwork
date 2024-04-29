import { Box, Link, Tooltip } from "@chakra-ui/react";
import { MdOutlineSettings } from "react-icons/md";
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
        to={`/settings`}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        {/* <Avatar size={"sm"} src={authUser?.profilePic || ""} /> */}
        <MdOutlineSettings size={24} />
        <Box display={{ base: "none", md: "block" }}>Setting</Box>
      </Link>
    </Tooltip>
  );
};

export default Settings;
