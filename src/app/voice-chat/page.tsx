"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

const VoiceChat = () => {
  const [conversation, setConversation] = useState<
    { user: string; bot: string }[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const toast = useToast();

  const synth = window.speechSynthesis;
  const recognition =
    typeof window !== "undefined" && "webkitSpeechRecognition" in window
      ? new (window as any).webkitSpeechRecognition()
      : null;

  useEffect(() => {
    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (
        event: SpeechRecognitionEvent & { results: SpeechRecognitionResultList }
      ) => {
        const transcript =
          event.results[event.resultIndex][0].transcript.trim();
        setUserInput(transcript);
        sendQuery(transcript);
      };

      recognition.onerror = () => {
        toast({
          title: "Error",
          description: "Speech recognition error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);
    }
  }, [recognition, toast]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    } else {
      toast({
        title: "Unsupported Browser",
        description: "Your browser doesn't support voice recognition.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const stopListening = () => {
    if (recognition) recognition.stop();
    setIsListening(false);
  };

  const sendQuery = async (query: string) => {
    const userMessage = { user: query, bot: "" };
    setConversation((prev) => [...prev, userMessage]);

    try {
      // Call your GPT-4 API here
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();

      const botMessage = { user: query, bot: data.reply };
      setConversation((prev) => [...prev.slice(0, -1), botMessage]);
      speakResponse(data.reply);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to fetch response.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const speakResponse = (text: string) => {
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendQuery(userInput.trim());
      setUserInput("");
    }
  };

  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={8}>
        <Heading size="xl" mb={6}>
          Voice Chat
        </Heading>

        <Box
          w="100%"
          h="400px"
          p={4}
          borderRadius="md"
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          overflowY="scroll"
          bg={useColorModeValue("gray.100", "gray.800")}
        >
          {conversation.map((msg, index) => (
            <Box key={index} mb={4}>
              <Text fontWeight="bold" color="blue.500">
                User:
              </Text>
              <Text>{msg.user}</Text>
              <Text fontWeight="bold" color="green.500" mt={2}>
                AarthikSakhi:
              </Text>
              <Text>{msg.bot}</Text>
            </Box>
          ))}
        </Box>

        <form onSubmit={handleTextSubmit} style={{ width: "100%" }}>
          <Input
            placeholder="Type your query here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            mb={4}
          />
          <Button type="submit" colorScheme="blue" w="full" mb={2}>
            Send
          </Button>
        </form>

        <Box>
          <IconButton
            icon={isListening ? <FaStop /> : <FaMicrophone />}
            aria-label={isListening ? "Stop Recording" : "Start Recording"}
            onClick={isListening ? stopListening : startListening}
            colorScheme={isListening ? "red" : "blue"}
            isRound
            size="lg"
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default VoiceChat;
