import {
  Avatar,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";
// import authScreenAtom from "../../atoms/authAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import { useState } from "react";


const SuggestedHeader = () => {
  // const { handleLogout, isLoggingOut } = useLogout();
  const logout = useLogout();

  // const authUser = authScreenAtom((state) => state.user);
  const authUser = useRecoilValue(userAtom);

  if (!authUser) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleConfirmLogout = () => {
    // Perform the logout action here
    logout();
    handleCloseModal();
  };

  return (
    <>
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
          // onClick={logout}
          onClick={openModal}
          cursor={"pointer"}
        >
          Log out
        </Button>
      </Flex>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        isCentered
        // sx={{
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   height: "100vh",
        // }}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        {/* {overlay} */}
        <ModalContent>
          <ModalHeader textAlign={"center"}>Logout</ModalHeader>
          <ModalBody>Do you want to logout?</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleConfirmLogout}>
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuggestedHeader;
