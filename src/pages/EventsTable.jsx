import { useEvents } from "../integrations/supabase/index.js";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar.jsx";

const EventsTable = () => {
  const { data: events, isLoading, isError } = useEvents();

  if (isLoading) {
    return (
      <Box>
        <Navbar />
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Navbar />
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Text fontSize="xl" color="red.500">Failed to load events</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Box p={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Venue ID</Th>
              <Th>Starred</Th>
              <Th>Private</Th>
              <Th>Cancelled</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>{event.venue_id}</Td>
                <Td>{event.is_starred ? "Yes" : "No"}</Td>
                <Td>{event.private ? "Yes" : "No"}</Td>
                <Td>{event.cancelled ? "Yes" : "No"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default EventsTable;