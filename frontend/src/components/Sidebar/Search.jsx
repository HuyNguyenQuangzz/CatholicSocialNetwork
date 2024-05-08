import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import SuggestedUser from "../SuggesterUser/SuggestedUser";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);

  const handleSearchUser = (e) => {
    e.preventDefault();
    // getUserProfile(searchRef.current.value);
    const searchTerm = searchRef.current.value;
    if (searchTerm) {
      getUserProfile(searchTerm);
    }
  };

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  // Get user profile by username
  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUserNotFound(false); // Reset userNotFound state
    try {
      // Perform API request to fetch user profile based on the username
      const response = await fetch(`/api/users/profile/${username}`);

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUserNotFound(true);
      }
      // const data = await response.json();
      // setUser(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserNotFound(true);
    }
    setIsLoading(false);
    // return { user, isLoading, userNotFound, getUserProfile, setUser };
  };
  const handleLiveSearch = (searchTerm) => {
    if (searchTerm) {
      getUserProfile(searchTerm);
    } else {
      // Clear the user state when the search term is empty
      setUser(null);
    }
  };
  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
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
          onClick={onOpen}
        >
          <IoSearch size={24} />

          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>

      {/*  Search user  in here using Model*/}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader textAlign={"center"}>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Finding someone..."
                  ref={searchRef}
                  onChange={(e) => handleLiveSearch(e.target.value)}
                />
              </FormControl>

              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {userNotFound && (
              <Box mt={4} color="red">
                User not found.
              </Box>
            )}
            {user && <SuggestedUser user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
