import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { GrView } from "react-icons/gr";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    dob: "",
    gender: "Male",
    address: "",
    phone: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });
  const [inputErrors, setInputErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  // Get List User
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/users/list");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  // Implement the code to create a new user
  const handleCreateNewUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (data.error) {
        console.error(response.data.error);
        return;
      }
      // setUsers((prevUsers) => [...prevUsers, response.data]);
      localStorage.setItem("user-catholic", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  // all function to create a new product

  const [isOpen, setIsOpen] = useState(false); // state for modal visibility
  const onClose = () => setIsOpen(false); // function to close modal

  const handleOpen = () => setIsOpen(true); // function to open modal

  const initialFormValues = {
    name: "",
    username: "",
    email: "",
    dob: "",
    gender: "Male",
    password: "",
  }; // initial form values

  const [formValues, setFormValues] = useState(initialFormValues); // state for form values

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }; // function to handle form value change

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form submission reload
    createUser(formValues); // create a new user
    setFormValues(initialFormValues); // reset form values
    onClose(); // close modal
  }; // function to handle form submission

  // const updateUser = async () => {
  //   try {
  //     await axios.patch(`/api/users/${users._id}`, formValues);
  //     toast({
  //       title: "User updated successfully",
  //       status: "success",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error occurred while updating user",
  //       description: error.message,
  //       status: "error",
  //     });
  //   }
  // };
  // handle of Modal to delete user
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDeleteUser = () => {
    setShowDeleteConfirm(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/users/${users._id}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== users._id)
      );
      setShowDeleteConfirm(false);
      toast({
        title: "User deleted successfully",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error occurred while deleting user",
        description: error.message,
        status: "error",
      });
    }
  };
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const onDeleteClose = () => setIsDeleteOpen(false);
  const onDeleteOpen = () => setIsDeleteOpen(true);
  // const selectedUser = users.find((user) => user._id === selectedUserId);

  const [selectedUser, selectedUserId, setSelectedUserId] = useState("");

  // Search User based on full name, username and email
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = () => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase())
    );
    setUsers(filteredUsers);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Heading textAlign={"center"}>Users Management</Heading>
      {/*  button to create a new user */}
      <Button
        variant="outline"
        mt={4}
        colorScheme="blue"
        // onClick={() => (window.location.href = "/admin/create-user")}
        onClick={handleOpen}
        // handle show form with all information of product to create a new product
      >
        Create New User
      </Button>

      {/* Search user based on full name and username */}
      <Box mt={5}>
        <Input
          placeholder="Search by name, username or email address"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button onClick={handleSearch} ml={2}>
          Search
        </Button>
        {/* <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                {user.name} ({user.username})
              </ListItem>
            ))}
          </List> */}
      </Box>

      <TableContainer>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>Full name</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              {/* <Th>Date of birth</Th> */}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((users) => (
              <Tr key={users._id}>
                <Td>{users.name}</Td>
                <Td>{users.username}</Td>
                <Td>{users.email}</Td>

                {/* <Td isNumeric>{users.dob}</Td> */}
                <Td>
                  {/* Handle using User model's update method to update user */}
                  <Button
                    mr={2}
                    // onClick={updateUser}
                  >
                    <RxUpdate />
                  </Button>

                  <Button
                    mr={2}
                    // onClick={deleteUser}
                  >
                    <AiOutlineDelete />
                  </Button>

                  <Button
                  // onClick={detailUser}
                  >
                    <GrView />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Implement a modal to create a new user with all fields */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Create a New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
              <FormControl id="name" isRequired>
                <FormLabel>Full name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, ""); // Remove spaces
                    setInputs({ ...inputs, username: value });
                  }}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                  value={inputs.email}
                />
              </FormControl>

              <FormControl isRequired isInvalid={inputErrors.gender}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  defaultValue={inputs.gender}
                  onChange={(value) => setInputs({ ...inputs, gender: value })}
                  name="gender"
                >
                  <Stack direction="row" spacing="24px">
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                    <Radio value="Other">Other</Radio>
                  </Stack>
                </RadioGroup>
                <FormErrorMessage>{inputErrors.gender}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={inputErrors.dob}>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  placeholder="Enter your date of birth"
                  onChange={(e) =>
                    setInputs({ ...inputs, dob: e.target.value })
                  }
                  value={inputs.dob}
                />
                <FormErrorMessage>{inputErrors.dob}</FormErrorMessage>
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
                  onChange={(e) =>
                    setInputs({ ...inputs, phone: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="number"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Input
                  placeholder="Your bio..."
                  value={inputs.bio}
                  onChange={(e) =>
                    setInputs({ ...inputs, bio: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
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
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleCreateNewUser}>
              Create User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Implement a modal to update a user with all fields */}

      {/* Implement a modal to delete a user */}
      <Modal
      // isOpen={onDeleteOpen} onClose={onDeleteClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete user {selectedUser?.username}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              // onClick={onDeleteClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                // handleDeleteUser(selectedUser.id);
                // onDeleteClose();
              }}
            >
              Delete User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <Button>
        Go to Admin
      </Button> */}
    </>
  );
};

export default UserManager;
