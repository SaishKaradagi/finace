import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Button,
  Avatar,
  Stack,
  Heading,
  Flex,
  Badge,
  IconButton,
  useColorModeValue,
  Tag,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  BookmarkPlus,
} from "lucide-react";

interface Story {
  title: string;
  content: string;
  author: string;
  avatar: string;
  date?: string;
  category?: string;
  likes?: number;
  readTime?: string;
  achievements?: string[];
}

interface SuccessStoriesProps {
  stories: Story[];
}

const SuccessStories: React.FC<SuccessStoriesProps> = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const highlightColor = useColorModeValue("teal.50", "teal.900");

  const handlePrevStory = () => {
    setCurrentStoryIndex((prev) =>
      prev !== null ? Math.max(0, prev - 1) : null
    );
  };

  const handleNextStory = () => {
    setCurrentStoryIndex((prev) =>
      prev !== null ? Math.min(stories.length - 1, prev + 1) : null
    );
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Success Stories</Heading>
        <HStack spacing={4}>
          <Button
            size="sm"
            variant="outline"
            colorScheme="teal"
            leftIcon={<ChevronLeft className="w-4 h-4" />}
            onClick={handlePrevStory}
            isDisabled={currentStoryIndex === 0 || currentStoryIndex === null}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="teal"
            rightIcon={<ChevronRight className="w-4 h-4" />}
            onClick={handleNextStory}
            isDisabled={currentStoryIndex === stories.length - 1}
          >
            Next
          </Button>
        </HStack>
      </Flex>

      <VStack spacing={6} align="stretch">
        {stories.map((story, index) => (
          <Box
            key={index}
            p={6}
            borderWidth={1}
            borderColor={borderColor}
            borderRadius="lg"
            bg={bgColor}
            boxShadow="md"
            _hover={{
              transform: "translateY(-4px)",
              transition: "all 0.3s",
              boxShadow: "lg",
            }}
            position="relative"
            overflow="hidden"
          >
            {/* Category Badge */}
            {story.category && (
              <Badge
                colorScheme="teal"
                position="absolute"
                top={4}
                right={4}
                fontSize="xs"
              >
                {story.category}
              </Badge>
            )}

            <Flex justify="space-between" align="flex-start">
              <Stack direction="row" spacing={4} align="center">
                <Avatar
                  src={story.avatar}
                  size="md"
                  name={story.author}
                  borderWidth={2}
                  borderColor="teal.500"
                />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    {story.author}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {story.date || "Recently shared"} •{" "}
                    {story.readTime || "2 min read"}
                  </Text>
                </Box>
              </Stack>
            </Flex>

            <Heading size="md" mt={4} mb={2}>
              {story.title}
            </Heading>

            <Text
              noOfLines={3}
              mb={4}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              {story.content}
            </Text>

            {story.achievements && (
              <HStack spacing={2} mb={4} flexWrap="wrap">
                {story.achievements.map((achievement, idx) => (
                  <Tag
                    key={idx}
                    size="sm"
                    colorScheme="teal"
                    variant="subtle"
                    mt={2}
                  >
                    {achievement}
                  </Tag>
                ))}
              </HStack>
            )}

            <Flex justify="space-between" align="center" mt={4}>
              <HStack spacing={2}>
                <IconButton
                  icon={<Heart className="w-4 h-4" />}
                  aria-label="Like story"
                  variant="ghost"
                  size="sm"
                  colorScheme="red"
                />
                <Text fontSize="sm" color="gray.500">
                  {story.likes || 0}
                </Text>
                <IconButton
                  icon={<Share2 className="w-4 h-4" />}
                  aria-label="Share story"
                  variant="ghost"
                  size="sm"
                />
                <IconButton
                  icon={<BookmarkPlus className="w-4 h-4" />}
                  aria-label="Save story"
                  variant="ghost"
                  size="sm"
                />
              </HStack>

              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => {
                  setCurrentStoryIndex(index);
                  onOpen();
                }}
              >
                Read Full Story
              </Button>
            </Flex>
          </Box>
        ))}
      </VStack>

      {/* Full Story Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentStoryIndex !== null && stories[currentStoryIndex].title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {currentStoryIndex !== null && (
              <>
                <Flex align="center" mb={4}>
                  <Avatar
                    src={stories[currentStoryIndex].avatar}
                    name={stories[currentStoryIndex].author}
                    size="sm"
                    mr={3}
                  />
                  <Text fontWeight="medium">
                    {stories[currentStoryIndex].author}
                  </Text>
                </Flex>
                <Text>{stories[currentStoryIndex].content}</Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SuccessStories;
