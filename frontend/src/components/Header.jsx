import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import authScreenAtom from "../atoms/authAtom";
import {
  MdNotificationsNone,
  MdOutlineChatBubbleOutline,
} from "react-icons/md";
// import { CiShoppingCart } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RiAdminFill } from "react-icons/ri";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex
      className="header"
      justifyContent={"space-between"}
      mt={1}
      mb={1}
      position={"sticky"}
      top={0}
      bg={colorMode === "light" ? "base" : "dark-lg"}
      w={"full"}

      // zIndex={999}
      p={4}
      rounded={"lg"}
      backdropFilter={"blur(10px)"} // Add blur effect
      // shadow={colorMode === "light" ? "base" : "dark-lg"}
    >
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("login")}
        >
          Login
        </Link>
      )}
      {!user && (
        <Image
          className="logo"
          cursor={"pointer"}
          alt="Logo"
          borderRadius={20}
          w={10}
          // src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          src={colorMode === "light" ? "/favicon.png" : "/favicon.png"}
          // src="/favicon.png"
          onClick={toggleColorMode}
        />
      )}

      {user && (
        <Flex alignItems={"center"} gap={6}>
          <Image
            className="logo"
            cursor={"pointer"}
            alt="Logo"
            borderRadius={"30px"}
            w={10}
            src={colorMode === "dark" ? "/favicon.png" : "/favicon.png"}
            onClick={toggleColorMode}
          />

          <Link as={RouterLink} to="/">
            <AiFillHome size={24} />
          </Link>

          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <MdOutlineChatBubbleOutline size={24} />
          </Link>

          <Link as={RouterLink} to={`/shopping`}>
            <LiaShoppingBagSolid size={24} />
          </Link>

          <Link as={RouterLink} to={`/notification`}>
            <MdNotificationsNone size={24} />
          </Link>
          {/* <Link as={RouterLink} to={`/cart`} pl={500}>
            <CiShoppingCart size={30} />
          </Link> */}

          {/* isAdmin: { type: Boolean,  default: false,}, only true wil show this */}
          {/* {user?.isAdmin && ( */}
          <Link as={RouterLink} to={`/admin`}>
            <RiAdminFill size={24} />
          </Link>
          {/* )} */}
        </Flex>
      )}

      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
