import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { FaRegMessage } from "react-icons/fa6";
// import { RiChatNewLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const Chat = () => {
  return (
    <Tooltip
      hasArrow
      label={"Chat"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Flex
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        {/* <MessagesLogo /> */}
        <FaRegMessage size={24} />
        {/* <RiChatNewLine size={24} /> */}
        <Link as={RouterLink} to={`/chat`}>
          <Box display={{ base: "none", md: "block" }}>Chat Box</Box>
        </Link>
      </Flex>
    </Tooltip>
  );
};

export default Chat;
