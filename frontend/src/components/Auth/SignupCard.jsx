import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
// import useShowToast from "../../hooks/useShowToast";
import userAtom from "../../atoms/userAtom";
import * as yup from "yup";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const [inputErrors, setInputErrors] = useState({});

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
      )
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignup = async (e) => {
    // console.log(inputs)
    e.preventDefault(); // not reload page when click on submit button
    try {
      await validationSchema.validate(inputs, { abortEarly: false });

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (data.error) {
        // showToast("Error", data.error, "error");
        return;
      }

      localStorage.setItem("user-catholic", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });

      setInputErrors(validationErrors);

      // showToast("Error", error, "error");
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired isInvalid={inputErrors.name}>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                  <FormErrorMessage>{inputErrors.name}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired isInvalid={inputErrors.username}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                    value={inputs.username}
                  />
                  <FormErrorMessage>{inputErrors.username}</FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired isInvalid={inputErrors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email address, ex: abcxyc...@gmail.com"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                value={inputs.email}
              />
              <FormErrorMessage>{inputErrors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={inputErrors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  value={inputs.password}
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
              <FormErrorMessage>{inputErrors.password}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={inputErrors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={inputs.confirmPassword}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirmPassword: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowConfirmPassword(
                        (showConfirmPassword) => !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{inputErrors.confirmPassword}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already have account?{" "}
                <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
                  Login now
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
