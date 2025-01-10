"use client";
import React from "react";
import {
  Grid,
  GridItem,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import MentorRecommendations from "./MentorRecommendations";
import CommunityFeed from "./CommunityFeed";
import LiveQA from "./LiveQA";
import SuccessStories from "./SuccessStories";

const CommunityPage = () => {
  const mentors = [
    {
      name: "John Doe",
      bio: "Experienced Financial Advisor and Entrepreneur.",
      expertise: ["Investment", "Budgeting"],
      location: "Bengaluru, India",
      rating: 0,
    },
    {
      name: "Jane Smith",
      bio: "Certified Mentor with a background in personal finance.",
      expertise: ["Financial Planning", "Retirement Savings"],
      location: "Mumbai, India",
      rating: 4.7,
    },
  ];

  const posts = [
    {
      id: 1,
      content: "How to start saving for retirement?",
      author: "Alice",
      time: "1 hour ago",
      likes: 10,
    },
    {
      id: 2,
      content: "Can someone explain how mutual funds work?",
      author: "Bob",
      time: "3 hours ago",
      likes: 5,
    },
  ];

  const liveSessions = [
    {
      title: "Investing in Stocks",
      date: "2025-01-15",
      time: "5:00 PM",
      description: "Learn the basics of investing in stocks.",
    },
    {
      title: "Budgeting 101",
      date: "2025-01-20",
      time: "6:00 PM",
      description: "A beginner's guide to budgeting.",
    },
  ];

  const successStories = [
    {
      id: "1",
      title: "From Debt to Financial Freedom",
      content:
        "I started with debt but now have financial security thanks to mentorship.",
      author: "Michael",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: "2",
      title: "Saving for My First Home",
      content: "With a budget plan, I'm now close to buying my first house.",
      author: "Sophia",
      avatar: "https://example.com/avatar2.jpg",
    },
  ];

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const containerBg = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Heading mb={8} textAlign="center" size="xl">
          Community Hub
        </Heading>

        {/* Desktop Layout */}
        <Grid
          templateColumns={{ base: "1fr", lg: "300px 1fr" }}
          gap={8}
          display={{ base: "none", lg: "grid" }}
        >
          <GridItem>
            <Box
              bg={containerBg}
              p={6}
              borderRadius="lg"
              shadow="md"
              position="sticky"
              top="20px"
            >
              <MentorRecommendations mentors={mentors} />
            </Box>
          </GridItem>

          <GridItem>
            <Grid gap={8}>
              <Box bg={containerBg} p={6} borderRadius="lg" shadow="md">
                <CommunityFeed posts={posts} />
              </Box>
              <Box bg={containerBg} p={6} borderRadius="lg" shadow="md">
                <LiveQA sessions={liveSessions} />
              </Box>
              <Box bg={containerBg} p={6} borderRadius="lg" shadow="md">
                <SuccessStories stories={successStories} />
              </Box>
            </Grid>
          </GridItem>
        </Grid>

        {/* Mobile Layout */}
        <Box display={{ base: "block", lg: "none" }}>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Feed</Tab>
              <Tab>Mentors</Tab>
              <Tab>Live Q&A</Tab>
              <Tab>Stories</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box bg={containerBg} p={4} borderRadius="lg" shadow="md">
                  <CommunityFeed posts={posts} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box bg={containerBg} p={4} borderRadius="lg" shadow="md">
                  <MentorRecommendations mentors={mentors} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box bg={containerBg} p={4} borderRadius="lg" shadow="md">
                  <LiveQA sessions={liveSessions} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box bg={containerBg} p={4} borderRadius="lg" shadow="md">
                  <SuccessStories stories={successStories} />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default CommunityPage;
