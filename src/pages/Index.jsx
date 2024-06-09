import { Container, Text, VStack, Box, Spinner } from "@chakra-ui/react";
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
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Events</Text>
        {events.length === 0 ? (
          <Text>No events found.</Text>
        ) : (
          events.map((event) => (
            <Box key={event.id} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" width="100%">
              <Text fontSize="xl" fontWeight="bold">{event.name}</Text>
              <Text>Date: {event.date}</Text>
              <Text>Venue: {event.venue_id}</Text>
              <Text>Starred: {event.is_starred ? "Yes" : "No"}</Text>
              <Text>Private: {event.private ? "Yes" : "No"}</Text>
              <Text>Cancelled: {event.cancelled ? "Yes" : "No"}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;