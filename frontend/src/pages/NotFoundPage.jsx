import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Link,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={4}
      py={20}
      // bgImg={"https://cloud.z.com/vn/wp-content/uploads/2023/04/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450-1.jpg"}
    >
      <Box maxW="lg" textAlign="center">
        <Heading as="h1" fontSize="4xl" mb={4}>
          Page Not Found
        </Heading>
        <Text fontSize="lg" mb={8}>
          Sorry, the page you're looking for doesn't exist.
        </Text>
        <Image
          src="https://cloud.z.com/vn/wp-content/uploads/2023/04/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450-1.jpg"
          alt="404-image"
          w="100%"
          mb={8}
        />
        <Link as={RouterLink} to={`/`}>
          <Button variant="solid" colorScheme="teal" size="lg">
            Return to Home Page
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default NotFoundPage;
