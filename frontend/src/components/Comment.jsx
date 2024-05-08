import { Avatar, Divider, Flex, Image, Text } from "@chakra-ui/react";

const Comment = ({ reply, lastReply }) => {
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - date) / 1000);
    const intervals = [
      ["year", 31536000],
      ["month", 2592000],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
      ["second", 1],
    ];

    for (const [name, interval] of intervals) {
      if (seconds >= interval) {
        return Math.floor(seconds / interval) + " " + name + "s ago";
      }
    }
    return "just now";
  };
  console.log(reply.createAt);

  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"} pb={10}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="sm" fontWeight="bold">
              {reply.username}
            </Text>
            {/* <Image src="/verified.png" w="4" h={4} ml={4} /> */}

            <Text fontSize="sm" color="gray.500">
              {/* now, minutes ago, hour ago , weeks ago, mm/dd/yyy */}
              {/* {reply.createAt} ago */}
              {formatTimeAgo(new Date(reply.commentAt))}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply ? <Divider /> : null}
      <Divider />
    </>
  );
};

export default Comment;
