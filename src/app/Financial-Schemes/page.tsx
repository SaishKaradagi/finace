"use client";
import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Button,
  Badge,
  IconButton,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { StarIcon, SearchIcon } from "@chakra-ui/icons";

// Mock API Data
const mockSchemes = [
  {
    name: "Sukanya Samriddhi Yojana",
    category: "Women Empowerment",
    description: "A scheme for girl child savings.",
    bookmarked: false,
  },
  {
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description: "Income support for farmers.",
    bookmarked: false,
  },
  {
    name: "Mudra Loan",
    category: "Entrepreneurship",
    description: "Loans for small businesses.",
    bookmarked: false,
  },
  {
    name: "Mahila E-Haat",
    category: "Women Empowerment",
    description: "Online platform for women entrepreneurs.",
    bookmarked: false,
  },
  {
    name: "Stand Up India",
    category: "Entrepreneurship",
    description: "Support for women and SC/ST entrepreneurs.",
    bookmarked: false,
  },
];

const FinancialSchemes = () => {
  const [schemes, setSchemes] = useState(mockSchemes);
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();

  // Categorize schemes
  const categories = Array.from(
    new Set(mockSchemes.map((scheme) => scheme.category))
  );

  // Search functionality
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Toggle Bookmark
  const toggleBookmark = (schemeName: string) => {
    setSchemes((prevSchemes) =>
      prevSchemes.map((scheme) =>
        scheme.name === schemeName
          ? { ...scheme, bookmarked: !scheme.bookmarked }
          : scheme
      )
    );
    toast({
      title: "Bookmark Updated",
      description: `Scheme ${schemeName} ${
        schemes.find((s) => s.name === schemeName)?.bookmarked
          ? "removed from"
          : "added to"
      } bookmarks.`,
      status: "info",
      duration: 3000,
    });
  };

  // Filter schemes by search and category
  const filteredSchemes = (category: string) =>
    schemes.filter(
      (scheme) =>
        scheme.category === category &&
        scheme.name.toLowerCase().includes(searchQuery)
    );

  return (
    <Box p={5}>
      <Heading mb={5}>Financial Schemes</Heading>

      {/* Search Bar */}
      <HStack mb={5}>
        <Input
          placeholder="Search schemes..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <IconButton
          aria-label="Search schemes"
          icon={<SearchIcon />}
          colorScheme="blue"
        />
      </HStack>

      {/* Tabs for Categories */}
      <Tabs isFitted variant="enclosed">
        <TabList>
          {categories.map((category) => (
            <Tab key={category}>{category}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {categories.map((category) => (
            <TabPanel key={category}>
              <VStack spacing={4}>
                {filteredSchemes(category).map((scheme) => (
                  <Box
                    key={scheme.name}
                    p={4}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    boxShadow="md"
                    width="100%"
                  >
                    <HStack justify="space-between">
                      <Text fontWeight="bold">
                        {scheme.name}{" "}
                        {scheme.bookmarked && (
                          <Badge colorScheme="green">Bookmarked</Badge>
                        )}
                      </Text>
                      <IconButton
                        aria-label="Bookmark scheme"
                        icon={<StarIcon />}
                        onClick={() => toggleBookmark(scheme.name)}
                        colorScheme={scheme.bookmarked ? "green" : "gray"}
                      />
                    </HStack>
                    <Text mt={2}>{scheme.description}</Text>
                  </Box>
                ))}
                {filteredSchemes(category).length === 0 && (
                  <Text>No schemes found.</Text>
                )}
              </VStack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default FinancialSchemes;
