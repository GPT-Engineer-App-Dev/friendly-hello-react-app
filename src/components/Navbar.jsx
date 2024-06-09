import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={2}>
      <Flex alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="white">
          MyApp
        </Text>
        <Spacer />
        <Flex>
          <Link as={RouterLink} to="/" color="white" mx={2}>
            Home
          </Link>
          <Link as={RouterLink} to="/events" color="white" mx={2}>
            Events
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;