import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";
// import { Link, Link as RouterLink } from "react-router-dom";

export default function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const username = user.username;
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    gender: user.gender,
    dob: user.dob,
    location: user.location,
    phone: user.phone,
    bio: user.bio,
    address: user.address,
    password: user.password,
  });
  const fileRef = useRef(null);
  const [updating, setUpdating] = useState(false);
  const [gender, setGender] = useState(user.gender); // State for gender

  const showToast = useShowToast();

  const { handleImageChange, imgUrl } = usePreviewImg();

  useEffect(() => {
    // Set the gender state when user data changes
    setGender(user.gender);
  }, [user.gender]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (updating || !validateForm()) return;
    if (updating) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json(); // updated user object
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Profile updated successfully", "success");
      setUser(data);
      localStorage.setItem("user-catholic", JSON.stringify(data));

      // Redirect to user page after saving changes
      window.location.href = `/${username}`;
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    // redirect to user page
    window.location.href = `/${username}`;
    // Redirect to homepage
    // window.location.href = "/";
  };

  // Function to handle gender change
  const handleGenderChange = (value) => {
    setGender(value); // Update gender state
    setInputs({ ...inputs, gender: value }); // Update inputs state
  };

  const formatDate = (dateString) => {
    // Convert dateString to a Date object
    const date = new Date(dateString);
    // Format the date as "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    // Add more fields as needed
  });
  const validateForm = () => {
    const newErrors = { ...errors };

    // Validation rules for each field
    if (inputs.name.trim() === "") {
      newErrors.name = "Name is required";
      return false;
    }

    if (inputs.email.trim() === "") {
      newErrors.email = "Email is required";
      return false;
    } else if (inputs.email.length > 100) {
      newErrors.email = "Email cannot be longer than 100 characters";
      return false;
    }

    if (inputs.phone.trim() === "") {
      newErrors.phone = "Phone number is required";
      return false;
    } else if (inputs.phone.length > 20) {
      newErrors.phone = "Phone number cannot be longer than 20 characters";
      return false;
    }

    // Add validation rules for other fields

    setErrors(newErrors);
    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} textAlign={"center"} my={6}>
        <Stack
          spacing={2}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading
            lineHeight={1.1}
            justifyContent={"center"}
            fontSize={{ base: "2xl", sm: "3xl" }}
          >
            Profile Update
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  boxShadow={"md"}
                  src={imgUrl || user.profilePic}
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="eg: John Doe"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="johndoe"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              _placeholder={{ color: "gray.500" }}
              type="text"
              disabled // Add this line
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="abc.xyz@gmail.com"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup value={gender} onChange={handleGenderChange}>
              <Stack direction="row" spacing="24px">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Date of Birth:</FormLabel>
            <Input
              type="date"
              // value={inputs.dob}
              value={formatDate(inputs.dob)} // Ensure inputs.dob is in "YYYY-MM-DD" format
              onChange={(e) => setInputs({ ...inputs, dob: e.target.value })}
              placeholderText="Select date"
              dateFormat="MM/dd/yyyy"
              isClearable
            />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              placeholder="eg: Viet Nam, Greenwich..."
              value={inputs.address}
              onChange={(e) =>
                setInputs({ ...inputs, address: e.target.value })
              }
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="+84 123 4567 89"
              value={inputs.phone}
              onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
              _placeholder={{ color: "gray.500" }}
              type="number"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Your bio..."
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>

          {/* Password */}
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="********************"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              _placeholder={{ color: "gray.500" }}
              type="password"
              disabled //   hidden
            />
          </FormControl>

          <Stack spacing={1} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              //   type="cancel"
              type="button"
              onClick={handleCancel}
              // redirect to homepage
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
              isLoading={updating}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
