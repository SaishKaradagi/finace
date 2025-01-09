"use client";
import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

const LearningResources = () => {
  // Categories and videos

  const [search, setSearch] = useState("");

  // Filter videos based on search
  interface Video {
    title: string;
    url: string;
  }

  interface Categories {
    [key: string]: Video[];
  }

  const categories: Categories = {
    "Financial Literacy": [
      {
        title: "A simple guide to savings, budgeting, and managing expenses.",
        url: "https://www.youtube.com/embed/-ICCmkj4xko?si=bc_Usai4WvydpOiP",
      },
      {
        title: "What is digital Banking",
        url: "https://www.youtube.com/embed/RuwJEG8ocbg?si=4GvwaY4cM4ufFBiy",
      },
      {
        title: "Introduction to Microfinance for Women",
        url: "https://www.youtube.com/embed/Qg08J0V0i10?si=T01r43hQ3OheaBI7",
      },
    ],
    "Digital Skills for Rural Women": [
      {
        title: "Using Smartphones for Financial Activities",
        url: "https://www.youtube.com/embed/hwxQGRO2yBA?si=mhO2673-hFvc2gHx",
      },
      {
        title: "Digital Security Tips for Women",
        url: "https://www.youtube.com/embed/kg6PHg5nCXM?si=TOFPQrpRxKox-rsV",
      },
    ],
    "Financial Planning": [
      {
        title: "Budgeting 101",
        url: "https://www.youtube.com/embed/sVKQn2I4HDM?si=BILeS0-nlWLG43vX0",
      },
      {
        title: "Investment Basics",
        url: "https://www.youtube.com/embed/tHxwyWnNu0c?si=et_u37IpBUFBQXzD",
      },
    ],
  };

  const filterVideos = (videos: Video[]): Video[] => {
    if (!search) return videos;
    return videos.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      minH="100vh"
      py={8}
      px={{ base: 4, md: 8 }}
    >
      {/* Hero Section */}
      <Box textAlign="center" mb={10}>
        <Heading
          fontSize={{ base: "2xl", md: "4xl" }}
          color={useColorModeValue("teal.600", "teal.300")}
        >
          Explore Learning Resources
        </Heading>
        <Heading
          fontSize={{ base: "lg", md: "xl" }}
          mt={2}
          color={useColorModeValue("gray.600", "gray.400")}
        >
          Enhance your skills with curated content
        </Heading>
      </Box>

      {/* Search Bar */}
      <Box textAlign="center" mb={8}>
        <Input
          placeholder="Search for a topic..."
          maxW="500px"
          mx="auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg={useColorModeValue("white", "gray.800")}
          borderColor={useColorModeValue("gray.300", "gray.700")}
        />
      </Box>

      {/* Tabs for Categories */}
      <Tabs variant="enclosed" colorScheme="teal">
        <TabList justifyContent="center">
          {Object.keys(categories).map((category, index) => (
            <Tab key={index}>{category}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {Object.entries(categories).map(([category, videos], index) => (
            <TabPanel key={index}>
              {/* Video Grid */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filterVideos(videos).map((video, idx) => (
                  <Box
                    key={idx}
                    bg={useColorModeValue("white", "gray.800")}
                    borderRadius="md"
                    overflow="hidden"
                    boxShadow="lg"
                  >
                    <iframe
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: "100%", aspectRatio: "16/9" }}
                    ></iframe>
                    <Box p={4}>
                      <Heading
                        fontSize="md"
                        color={useColorModeValue("gray.700", "gray.300")}
                      >
                        {video.title}
                      </Heading>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LearningResources;
