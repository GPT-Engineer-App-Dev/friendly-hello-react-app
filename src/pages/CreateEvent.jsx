import { useState } from "react";
import { useAddEvent } from "../integrations/supabase/index.js";
import { Box, Button, Checkbox, Container, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [isStarred, setIsStarred] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const toast = useToast();
  const addEvent = useAddEvent();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent.mutateAsync({ name, date, venue, is_starred: isStarred, private: isPrivate, cancelled: isCancelled });
      toast({
        title: "Event created.",
        description: "Your event has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setName("");
      setDate("");
      setVenue("");
      setIsStarred(false);
      setIsPrivate(false);
      setIsCancelled(false);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" width="100%" maxWidth="500px">
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Event Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
          <FormControl id="venue" isRequired>
            <FormLabel>Venue</FormLabel>
            <Input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} />
          </FormControl>
          <Checkbox isChecked={isStarred} onChange={(e) => setIsStarred(e.target.checked)}>Is Starred</Checkbox>
          <Checkbox isChecked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)}>Private</Checkbox>
          <Checkbox isChecked={isCancelled} onChange={(e) => setIsCancelled(e.target.checked)}>Cancelled</Checkbox>
          <Button type="submit" colorScheme="blue" width="full">Create Event</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreateEvent;