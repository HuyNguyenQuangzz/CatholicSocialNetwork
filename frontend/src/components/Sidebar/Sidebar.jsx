import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CatholicLogo, CatholicMobileLogo } from "../../assets/constants";

import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

import React, { useState } from "react";

const Sidebar = () => {
  // const { handleLogout, isLoggingOut } = useLogout();
  const logout = useLogout();
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
  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = React.useState(<Overlay />);

  return (
    <>
      <Box
        height={"100vh"}
        borderRight={"1px solid"}
        borderColor={"whiteAlpha.300"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{ base: 2, md: 4 }}
      >
        <Flex direction={"column"} gap={10} w="full" height={"full"}>
          <Link
            to={"/"}
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            cursor="pointer"
          >
            <CatholicLogo />
          </Link>
          <Link
            to={"/"}
            as={RouterLink}
            p={2}
            display={{ base: "block", md: "none" }}
            borderRadius={6}
            _hover={{
              bg: "whiteAlpha.200",
            }}
            w={10}
            cursor="pointer"
          >
            <CatholicMobileLogo />
          </Link>
          <Flex direction={"column"} gap={5} cursor={"pointer"}>
            <SidebarItems />
          </Flex>
          {/* Setting  */}
          {/* <Tooltip
          hasArrow
          label={"Setting"}
          placement="right"
          ml={1}
          mb={100}
          // openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            // w={{ base: 10, md: "full" }}
            mt={"auto"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} />
            <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              // isLoading={isLoggingOut}
              onClick={logout}
            >
              Setting
            </Button>
          </Flex>
        </Tooltip> */}
          {/* LOGOUT */}
          <Tooltip
            hasArrow
            label={"Logout"}
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
              mt={"auto"}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <BiLogOut size={25} />
              <Button
                display={{ base: "none", md: "block" }}
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                // isLoading={isLoggingOut}
                // onClick={logout}
                // onClick={openModal}
                onClick={() => {
                  setOverlay(<Overlay />);
                  openModal();
                }}
              >
                Logout
              </Button>
            </Flex>
          </Tooltip>
        </Flex>
      </Box>

      <Modal isOpen={showModal} onClose={handleCloseModal} isCentered>
        {/* <ModalOverlay /> */}
        {overlay}
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

export default Sidebar;
