import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { FaEllipsisH } from "react-icons/fa";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { CgMoreO } from "react-icons/cg";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import { useEffect, useState } from "react";
import postsAtom from "../atoms/postsAtom";
// import postsAtom from "../atoms/postsAtom";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); // logged in user
  const [posts, setPosts] = useRecoilState(postsAtom);

  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

  const copyURL = () => {
    const currentURL = window.location.href;
    // console.log(window);
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Success.",
        status: "success",
        description: "Profile link copied.",
        duration: 3000,
        isClosable: true,
      });
    });
  };
  const reportProfile = () => {
    const message = `Do you want to report ${user.username}'s profile?`;
    if (window.confirm(message)) {
      toast({
        title: "Success.",
        status: "error",
        description: `${user.username}'s profile has been reported.`,
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleFavorite = () => {
    toast({
      title: "Success.",
      status: "success",
      description: ` You have added ${user.username}'s to your favorites list.`,
      duration: 3000,
      isClosable: true,
    });
  };
  // const handleFavorite = () => {
  //   const favoriteStatus = user.favorites.find((favorite) => favorite.id === currentUser.id);
  //   if (favoriteStatus) {
  //     // user is favorited, remove it
  //     const updatedFavorites = user.favorites.filter((favorite) => favorite.id !== currentUser.id);
  //     fetch(`/api/users/${user.id}/favorites`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ favorites: updatedFavorites }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         if (data.success) {
  //           toast({
  //             title: "Success.",
  //             status: "success",
  //             description: "User has been unfavorited.",
  //             duration: 3000,
  //             isClosable: true,
  //           });
  //           user.favorites = updatedFavorites;
  //         }
  //       });
  //   } else {
  //     // user is not favorited, add it
  //     const updatedFavorites = [...user.favorites, currentUser];
  //     fetch(`/api/users/${user.id}/favorites`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ favorites: updatedFavorites }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         if (data.success) {
  //           toast({
  //             title: "Success.",
  //             status: "success",
  //             description: "User has been favorited.",
  //             duration: 3000,
  //             isClosable: true,
  //           });
  //           user.favorites = updatedFavorites;
  //         }
  //       });
  //   }
  //   // TODO: Implement favorite functionality
  //   console.log("Favorite functionality is not implemented yet.");
  // };

  const handleRestricted = () => {
    toast({
      title: "Success.",
      status: "success",
      description: ` You have added ${user.username}'s to your restricted list.`,
      duration: 3000,
      isClosable: true,
    });
    console.log("Restricted functionality is not implemented yet.");
  };

  const handleBlock = () => {
    const message = `Do you want to block ${user.username}'s profile?`;
    if (window.confirm(message)) {
      toast({
        title: "Success.",
        status: "error",
        description: `${user.username}'s profile has been blocked.`,
        duration: 3000,
        isClosable: true,
      });
    }
    console.log("Block functionality is not implemented yet.");
  };

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followers, setFollowers] = useState(user.followers || []);
  // const [following, setFollowing] = useState(user.following || []);

  const handleShowFollowersModal = () => {
    setShowFollowersModal(true);
  };

  const handleCloseFollowersModal = () => {
    setShowFollowersModal(false);
  };

  const handleShowFollowingModal = () => {
    setShowFollowingModal(true);
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Fullname: {user.name}
          </Text>
          {/* <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
          </Flex> */}
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"}>Gender: {user.gender}</Text>
          </Flex>
          {/* Format dob as mm/dd/yyyy */}
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"}>
              {" "}
              Date of Birth: {user.dob}
              {/* {"  "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(user.dob))} */}
            </Text>
          </Flex>
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"}>Address: {user.address}</Text>
          </Flex>
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"}>Phone Number: {user.phone}</Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
                lg: "2xl",
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "md",
                md: "xl",
                lg: "2xl",
              }}
            />
          )}
        </Box>
      </Flex>

      <Text>Bio: {user.bio}</Text>

      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>Update Your Profile</Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (
        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      {/* Number of Followers and Following */}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          {/* Number of Following */}
          <Link color={"gray.light"} onClick={handleShowFollowingModal}>
            {user.following.length} following
          </Link>
          {/* Following Modal */}
          <Modal
            isOpen={showFollowingModal}
            onClose={() => setShowFollowingModal(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Following</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* List of Following Users */}
                {user.following.map((following) => (
                  <Text key={following.id}>{following.name}</Text>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={() => setShowFollowingModal(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/*  how i can show other user when they click into link following and then show all user already following this user 
          help me show modal all user following this user when they click to link*/}
          {/* Number of Followers */}
          <Link color={"gray.light"} onClick={handleShowFollowersModal}>
            {user.followers.length} followers
          </Link>

          <Modal
            isOpen={showFollowersModal}
            onClose={handleCloseFollowersModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Followers</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {user.followers.map((follower) => (
                  <Text key={follower.id}>{follower.name}</Text>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleCloseFollowersModal}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* <Text color={"gray.light"}>{totalPosts} posts</Text> */}
          <Text color={"gray.light"}>{posts.length} posts</Text>
        </Flex>

        {/* More Options Menu */}
        <Flex>
          <Box>
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
                {/* <FaEllipsisH size={24} cursor={"pointer"} /> */}
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem onClick={handleFavorite}>Favorite</MenuItem>
                  <MenuItem onClick={handleRestricted}>Restricted</MenuItem>

                  <MenuItem onClick={copyURL}>Copy link</MenuItem>
                  <MenuItem onClick={handleBlock} color="red">
                    Block
                  </MenuItem>
                  <MenuItem onClick={reportProfile} color="red">
                    Report
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      {/* User Activity Sections */}
      {/* handle these activity sections when user clicking into */}
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Your Activity</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Your Group</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Your Collection</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
