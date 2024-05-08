// create a notification page to show all like, comment, order detail update with charka UI
import React from "react";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";

const Notification = () => {
  return (
    <VStack spacing={4} align="flex-start" borderRadius={4}>
      <NotificationItem
        type="like"
        username="John Doe"
        postId="12345"
        timestamp="2022-01-01T12:00:00Z"
      />
      <NotificationItem
        type="comment"
        username="Jane Doe"
        comment="This is a great post!"
        postId="67890"
        timestamp="2022-01-01T13:00:00Z"
      />
      <NotificationItem
        type="orderUpdate"
        orderId="54321"
        status="shipped"
        timestamp="2022-01-01T14:00:00Z"
      />
    </VStack>
  );
};

const NotificationItem = ({
  type,
  username,
  comment,
  postId,
  orderId,
  status,
  timestamp,
}) => {
  let notificationContent;
  switch (type) {
    case "like":
      notificationContent = (
        <Text>
          <strong>{username}</strong> liked your post <strong>{postId}</strong>
        </Text>
      );
      break;
    case "comment":
      notificationContent = (
        <Text>
          <strong>{username}</strong> commented on your post{" "}
          <strong>{postId}</strong>: <em>{comment}</em>
        </Text>
      );
      break;
    case "orderUpdate":
      notificationContent = (
        <Text>
          Order <strong>{orderId}</strong> has been <strong>{status}</strong>
        </Text>
      );
      break;
    default:
      notificationContent = <Text>Unknown notification</Text>;
  }

  return (
    <Box p={2} borderRadius={4}>
      {notificationContent}
      <Text fontSize="sm" color="gray.500" mt={2}>
        {timestamp}
      </Text>
    </Box>
  );
};

export default Notification;
