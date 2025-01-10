"use client";
import { Box, Text, HStack, Tag, Avatar } from "@chakra-ui/react";

type MentorCardProps = {
  name: string;
  bio: string;
  expertise: string[];
  location: string;
};

const MentorCard: React.FC<MentorCardProps> = ({
  name,
  bio,
  expertise,
  location,
}) => {
  return (
    <Box borderWidth={1} p={4} borderRadius="md" mb={4}>
      <HStack spacing={4}>
        <Avatar name={name} />
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color="gray.500">
            {location}
          </Text>
        </Box>
      </HStack>
      <Text mt={2}>{bio}</Text>
      <HStack mt={4} spacing={2}>
        {expertise.map((item, index) => (
          <Tag key={index} colorScheme="teal">
            {item}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
};

export default MentorCard;
