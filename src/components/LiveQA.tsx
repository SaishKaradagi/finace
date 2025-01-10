import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Heading,
  useColorModeValue,
  Flex,
  Avatar,
  Grid,
  GridItem,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Session {
  title: string;
  date: string;
  time: string;
  description: string;
  mentorName?: string;
  mentorAvatar?: string;
  participants?: number;
}

interface LiveQAProps {
  sessions: Session[];
}

const LiveQA: React.FC<LiveQAProps> = ({ sessions }) => {
  const [now] = useState(new Date());
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const getSessionStatus = (sessionDate: string, sessionTime: string) => {
    const sessionDateTime = new Date(`${sessionDate} ${sessionTime}`);
    const diffInHours =
      (sessionDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 0) return "ended";
    if (diffInHours < 1) return "live";
    return "upcoming";
  };

  const getTimeRemaining = (sessionDate: string, sessionTime: string) => {
    const sessionDateTime = new Date(`${sessionDate} ${sessionTime}`);
    return Math.max(0, sessionDateTime.getTime() - now.getTime()) / 1000;
  };

  const formatRemainingTime = (remainingTime: number) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = Math.floor(remainingTime % 60);

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const handleJoinSession = (status: string) => {
    if (status === "ended") {
      toast({
        title: "Session has ended",
        description: "Recording will be available soon",
        status: "info",
        duration: 3000,
      });
    } else if (status === "upcoming") {
      toast({
        title: "Reminder set!",
        description: "We'll notify you when the session starts",
        status: "success",
        duration: 3000,
      });
    } else {
      toast({
        title: "Joining session...",
        status: "success",
        duration: 2000,
      });
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Live Q&A & Discussions</Heading>
        <Button size="sm" colorScheme="teal" variant="outline">
          View All Sessions
        </Button>
      </Flex>

      <VStack spacing={6} align="stretch">
        {sessions.map((session, index) => {
          const status = getSessionStatus(session.date, session.time);
          const timeRemaining = getTimeRemaining(session.date, session.time);

          return (
            <Box
              key={index}
              p={6}
              borderWidth={1}
              borderRadius="lg"
              bg={bgColor}
              boxShadow="md"
              _hover={{ transform: "translateY(-2px)", transition: "all 0.2s" }}
            >
              <Grid templateColumns={{ base: "1fr", md: "1fr auto" }} gap={6}>
                <GridItem>
                  <Flex justify="space-between" align="flex-start">
                    <Box flex="1">
                      <HStack spacing={3} mb={2}>
                        <Heading size="md">{session.title}</Heading>
                        <Badge
                          colorScheme={
                            status === "live"
                              ? "red"
                              : status === "upcoming"
                              ? "green"
                              : "gray"
                          }
                        >
                          {status.toUpperCase()}
                        </Badge>
                      </HStack>

                      <HStack spacing={4} mb={3}>
                        <Text fontSize="sm" color="gray.500">
                          {new Date(`${session.date}`).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {session.time}
                        </Text>
                      </HStack>

                      <Text mb={4}>{session.description}</Text>

                      <HStack spacing={4} mb={4}>
                        <Avatar
                          size="sm"
                          name={session.mentorName || "Mentor"}
                          src={session.mentorAvatar}
                        />
                        <Box>
                          <Text fontSize="sm" fontWeight="medium">
                            {session.mentorName || "Expert Mentor"}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            Session Host
                          </Text>
                        </Box>
                        {session.participants && (
                          <Badge ml={4} colorScheme="gray">
                            {session.participants} joined
                          </Badge>
                        )}
                      </HStack>
                    </Box>
                  </Flex>
                </GridItem>

                <GridItem>
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    h="100%"
                  >
                    {status !== "ended" && (
                      <Box mb={4}>
                        <CountdownCircleTimer
                          isPlaying
                          duration={timeRemaining}
                          size={80}
                          strokeWidth={4}
                          colors={["#38B2AC", "#ED8936", "#E53E3E"]}
                          colorsTime={[timeRemaining, timeRemaining / 2, 0]}
                          trailColor={useColorModeValue("#E2E8F0", "#2D3748")}
                        >
                          {({ remainingTime }) => (
                            <Tooltip label="Time until session starts">
                              <Text fontSize="sm" fontWeight="medium">
                                {formatRemainingTime(remainingTime)}
                              </Text>
                            </Tooltip>
                          )}
                        </CountdownCircleTimer>
                      </Box>
                    )}

                    <Button
                      colorScheme={status === "live" ? "red" : "teal"}
                      variant={status === "ended" ? "outline" : "solid"}
                      onClick={() => handleJoinSession(status)}
                      w="full"
                    >
                      {status === "live"
                        ? "Join Now"
                        : status === "upcoming"
                        ? "Set Reminder"
                        : "View Recording"}
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default LiveQA;
