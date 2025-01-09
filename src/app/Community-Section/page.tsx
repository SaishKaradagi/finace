"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Text,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addPost } from "../redux/postsSlice";

// Define the Post type
interface Post {
  title: string;
  content: string;
}

// Component to display individual post in the forum
const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <Box border="1px" borderRadius="md" p={4} boxShadow="sm" bg="white">
    <Text fontSize="xl" fontWeight="bold">
      {post.title}
    </Text>
    <Text mt={2}>{post.content}</Text>
    <Button mt={4} colorScheme="teal">
      Join Discussion
    </Button>
  </Box>
);

// Community Forum Section
const CommunityForum: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const dispatch = useDispatch();

  // Retrieve posts from Redux state
  const posts = useSelector((state: RootState) => state.posts);

  const handlePostSubmit = () => {
    if (title && content) {
      // Dispatch action to add post
      dispatch(addPost({ title, content }));
      setTitle("");
      setContent("");
    }
  };

  return (
    <Box p={6} maxW="7xl" mx="auto">
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Join the Discussion
      </Text>

      {/* Post Form */}
      <Box bg="gray.50" p={6} borderRadius="lg" boxShadow="lg" mb={6}>
        <Stack spacing={4}>
          <Input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            size="md"
          />
          <Button colorScheme="teal" onClick={handlePostSubmit}>
            Post
          </Button>
        </Stack>
      </Box>

      {/* Display Posts */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Recent Posts
      </Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {posts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CommunityForum;
