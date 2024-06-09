import { Container, Text, VStack, Box, Spinner, Button, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, isLoading, isError, error } = useEvents();

  if (isLoading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Text fontSize="xl" color="red.500">{error.message}</Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.xl" py={8}>
      <Text fontSize="4xl" fontWeight="bold" mb={8}>Events</Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} width="100%">
        {events.length === 0 ? (
          <Text>No events found.</Text>
        ) : (
          events.map((event) => (
            <Box key={event.id} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
              <Text fontSize="xl" fontWeight="bold">{event.name}</Text>
              <Text>Date: {event.date}</Text>
              <Text>Venue: {event.venue_id}</Text>
              <Text>Starred: {event.is_starred ? "Yes" : "No"}</Text>
              <Text>Private: {event.private ? "Yes" : "No"}</Text>
              <Text>Cancelled: {event.cancelled ? "Yes" : "No"}</Text>
              <Link to={`/edit-event/${event.id}`}>
                <Button colorScheme="blue" mt={2}>Edit</Button>
              </Link>
            </Box>
          ))
        )}
      </SimpleGrid>
    </Container>
  );
};

export default Index;