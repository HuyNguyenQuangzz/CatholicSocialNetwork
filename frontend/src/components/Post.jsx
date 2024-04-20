import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import {
  Divider,
  // Menu,
  // MenuButton,
  // MenuItem,
  // MenuList,
  // Portal,
} from "@chakra-ui/react";
// import { IoIosMore } from "react-icons/io";
// import { useToast } from "@chakra-ui/react";

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const navigate = useNavigate();
  // const toast = useToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  // const copyURLpost = () => {
  //   const currentURL = window.location.href;
  //   // console.log(window);
  //   navigator.clipboard.writeText(currentURL).then(() => {
  //     toast({
  //       title: "Success.",
  //       status: "success",
  //       description: "Profile link copied.",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   });
  // };

  if (!user) return null;
  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Box h="1px" w={"full"} bg="gray.light" my={1}></Box>
      <Flex gap={3} mb={10} py={1}>
        {/* header */}
        <Flex flexDirection={"column"} alignItems={"center"}>
          {/* Avatar User */}
          <Avatar
            size="md"
            name={user.name}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />

          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>

          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>😿</Text>}
            {/* avatar bottom */}
            {post.replies[0] && (
              <Avatar
                size="xs"
                name="John doe"
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left="10px"
                padding={"2px"}
              />
            )}

            {/* avatar left */}
            {post.replies[1] && (
              <Avatar
                size="xs"
                name="John doe"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right="-3px"
                padding={"2px"}
              />
            )}
            {/* avatar right */}
            {post.replies[2] && (
              <Avatar
                size="xs"
                name="John doe"
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left="-1px"
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        {/* content */}
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user?.username}
              </Text>
              {/* verified image */}
              <Image src="/verified.png" w={4} h={4} ml={1} />
              {/* Date */}
              {/* <Text
                fontSize={"xs"}
                width={36}
                // textAlign={"right"}
                p={5}
                color={"gray.light"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text> */}
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              {/* <Box className="icon-container">
                <Menu>
                  <MenuButton>
                    <IoIosMore size={24} cursor={"pointer"} />
                  </MenuButton>
                  <Portal>
                    <MenuList bg={"gray.dark"}>
                      <MenuItem bg={"gray.dark"} onClick={copyURLpost}>
                        Copy link
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </Box> */}
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>

              {currentUser?._id === user._id && (
                <DeleteIcon size={20} onClick={handleDeletePost} />
              )}
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>

          {/* <Divider bg="gray.light" px="65" /> */}
        </Flex>
      </Flex>
      {!post ? <Divider /> : null}
      {/* <Box h="1px" w={"full"} bg="gray.light" my={1}></Box> */}
    </Link>
  );
};

export default Post;
