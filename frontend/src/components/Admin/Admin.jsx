import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Admin = () => {
  return (
    <Box p="4">
      <Heading as="h1" size="lg" mb="4">
        Admin Dashboard
      </Heading>
      <Text>Welcome to the admin dashboard. Here, you can manage various aspects of your application.</Text>
      {/* Add more components and functionality as needed */}
    </Box>
  );
};

export default Admin;
