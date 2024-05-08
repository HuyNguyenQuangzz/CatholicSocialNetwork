import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { CatholicLogo } from "../assets/constants";

export default function AboutUs() {
  return (
    <Box
    //   bg={useColorModeValue("gray.50", "gray.900")}
    //   color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <CatholicLogo />
        <Stack direction={"row"} spacing={6}>
          <Box as="a" href={"/"}>
            Home
          </Box>
          <Box as="a" href={"/aboutUs"}>
            About
          </Box>
          {/* <Box as="a" href={"#"}>
            Blog
          </Box> */}
          <Box as="a" href={"/aboutUs"}>
            Contact
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2024 Catholic Social Network. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <Button label={"Twitter"} href={"#"}>
              <FaTwitter />
            </Button>
            <Button label={"YouTube"} href={"#"}>
              <FaYoutube />
            </Button>
            <Button label={"Instagram"} href={"#"}>
              <FaInstagram />
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
