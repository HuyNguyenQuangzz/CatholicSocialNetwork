import { Box, Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
// import { useHistory } from 'react-router-dom';
export const SettingsPage = () => {
  const showToast = useShowToast();
  const logout = useLogout();

  const freezeAccount = async () => {
    if (!window.confirm("Are you sure you want to freeze your account?"))
      return;

    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      if (data.success) {
        await logout();
        showToast("Success", "Your account has been frozen", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
//   const history = useHistory();
  const handleClick = () => {
    // history.push('/'); // assuming your NotFoundPage is at /not-found route
  };

  return (
    <>
      <Box>
        <Text fontSize="xx-large" fontWeight="bold" my={4}>
          Settings
        </Text>

        <Text my={1} fontWeight={"bold"}>
          Change your password Account
        </Text>
        <Button
          colorScheme="blue"
          onClick={handleClick}
          variant="outline"
          my={2}
          width="100%"
        >
          Change Password
        </Button>

        <Text my={1} fontWeight={"bold"}>
          Finding someone who near your address
        </Text>
        <Button colorScheme="green" variant="outline" my={2} width="100%">
          Find Someone Near Me
        </Button>

        <Text my={1} fontWeight={"bold"}>
          Explore a new world, where you can feel amazing
        </Text>
        <Button colorScheme="purple" variant="outline" my={2} width="100%">
          Explore Virtual Church
        </Button>

        <Text my={1} fontWeight={"bold"}>
          Finding any church using google map
        </Text>
        <Button colorScheme="teal" variant="outline" my={2} width="100%">
          Find Church Using Map
        </Button>

        <Text my={1} fontWeight={"bold"}>
          Freeze Your Account
        </Text>
        <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
        <Button
          colorScheme="teal"
          onClick={freezeAccount}
          variant="outline"
          my={2}
          width="100%"
        >
          Freeze
        </Button>
      </Box>
    </>
  );
};
