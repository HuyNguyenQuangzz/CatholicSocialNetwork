import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import {
  MdNotificationsNone,
  MdOutlineChatBubbleOutline,
  MdOutlineSettings,
} from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex
      className="header"
      justifyContent={"space-between"}
      mt={1}
      mb={1}
      position={"sticky"}
      top={0}
      // bg={"white"}
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

          <Link as={RouterLink} to={`/settings`}>
            <MdNotificationsNone size={24} />
          </Link>

          <Link as={RouterLink} to={`/settings`}>
            <LiaShoppingBagSolid size={24} />
          </Link>

          <Link as={RouterLink} to={`/chat`}>
            <MdOutlineChatBubbleOutline size={24} />
          </Link>

          <Link as={RouterLink} to={`/settings`}>
            <CiShoppingCart size={24} />
          </Link>

          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={24} />
          </Link>

          <Button size={"xxs"} onClick={logout}>
            <FiLogOut size={24} />
          </Button>
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