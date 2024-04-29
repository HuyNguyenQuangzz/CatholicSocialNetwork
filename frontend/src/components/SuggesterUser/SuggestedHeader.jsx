import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";
// import authScreenAtom from "../../atoms/authAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

const SuggestedHeader = () => {
  // const { handleLogout, isLoggingOut } = useLogout();
  const logout = useLogout();

  // const authUser = authScreenAtom((state) => state.user);
  const authUser = useRecoilValue(userAtom);

  if (!authUser) return null;

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      mt={-14}
      mb={5}
      // position={"fixed"}
    >
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.username}`}>
          <Avatar size={"lg"} src={authUser.profilePic} />
        </Link>
        <Link to={`${authUser.username}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser.username}
          </Text>
        </Link>
      </Flex>
      <Button
        size={"xs"}
        background={"transparent"}
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        onClick={logout}
        cursor={"pointer"}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
