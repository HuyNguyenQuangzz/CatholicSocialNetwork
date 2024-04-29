import {
  Box,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../../hooks/useShowToast";
import SuggestedHeader from "./SuggestedHeader";

const SuggestedUsers = () => {
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setSuggestedUsers(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getSuggestedUsers();
  }, [showToast]);

  return (
    <>
      <SuggestedHeader />
      <Text mb={4} fontWeight={"bold"}>
        Suggested users for you
      </Text>

      <Flex direction={"column"} gap={4}>
        {!loading &&
          suggestedUsers.map((user) => (
            <SuggestedUser key={user._id} user={user} />
          ))}
        {loading &&
          [0, 1, 2, 3, 4, 5, 6].map((_, idx) => (
            <Flex
              key={idx}
              gap={2}
              alignItems={"center"}
              p={"1"}
              borderRadius={"md"}
            >
              {/* avatar skeleton */}
              <Box>
                <SkeletonCircle size={"10"} />
              </Box>
              {/* username and fullname skeleton */}
              <Flex w={"full"} flexDirection={"column"} gap={2}>
                <Skeleton h={"8px"} w={"80px"} />
                <Skeleton h={"8px"} w={"90px"} />
              </Flex>
              {/* follow button skeleton */}
              <Flex>
                <Skeleton h={"20px"} w={"60px"} />
              </Flex>
            </Flex>
          ))}
      </Flex>

      <Box fontSize={15} color={"gray.70"} mt={5} alignSelf={"start"}>
        © 2024 Copyright <br></br> Belong to{" "}
        <Link
          href="https://github.com/HuyNguyenQuangzz"
          target="_blank"
          color="blue.500"
          fontSize={14}
        >
          Nguyen Quang Huy
        </Link>
      </Box>

      <Box fontSize={15} color={"gray.70"} mt={5} alignSelf={"start"}>
        Contact: huynqgch200643@fpt.edu.vn
      </Box>
      <Box fontSize={15} color={"gray.70"} mt={5} alignSelf={"start"}>
        University of Greenwich - Hanoi Campus
      </Box>
    </>
  );
};

export default SuggestedUsers;
