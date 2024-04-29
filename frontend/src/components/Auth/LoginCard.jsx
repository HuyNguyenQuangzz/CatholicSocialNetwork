import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Checkbox,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import useShowToast from "../../hooks/useShowToast";
import userAtom from "../../atoms/userAtom";

// import * as yup from "yup";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // const schema = yup.object().shape({
  //   username: yup.string().min(3).required(),
  //   password: yup.string().min(6).required(),
  // });

  const showToast = useShowToast();
  // const errors = handleLogin();
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.setItem("user-catholic", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Prevent default form submission behavior
  //   onSubmit(username, password); // Call the provided onSubmit function
  // };
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}
        >
          <Stack spacing={4}>
            <FormControl
              // isInvalid={!!errors?.email?.message}
              // errortext={errors?.email?.message}
              isRequired
            >
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={inputs.username}
                onChange={(e) =>
                  setInputs((inputs) => ({
                    ...inputs,
                    username: e.target.value,
                  }))
                }
                onKeyPress={handleKeyPress}
              />
              {/* <FormErrorMessage>{errors?.email?.message}</FormErrorMessage> */}
              {/* <FormHelperText>
                Your username must at least 3 characters
              </FormHelperText> */}
            </FormControl>
            <FormControl
              // isInvalid={!!errors?.password?.message}
              // errortext={errors?.password?.message}
              isRequired
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((inputs) => ({
                      ...inputs,
                      password: e.target.value,
                    }))
                  }
                  // handle press Enter
                  onKeyPress={handleKeyPress}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {/* <FormErrorMessage>{errors?.password?.message}</FormErrorMessage> */}
              {/* <FormHelperText>
                Your password must at least 6 characters
              </FormHelperText> */}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                {/* <Text color={"blue.400"}>Forgot password?
                </Text> */}
                <Link
                  color={"blue.400"}
                  onClick={() => setAuthScreen("signup")}
                >
                  Forgot password?
                </Link>
              </Stack>

              <Button
                loadingText="Logging in"
                size="lg"
                bg={useColorModeValue("gray.700", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("blue", "gray.800"),
                }}
                onClick={handleLogin}
                isLoading={loading}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don&apos;t have an account?{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => setAuthScreen("signup")}
                >
                  Sign up now
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
