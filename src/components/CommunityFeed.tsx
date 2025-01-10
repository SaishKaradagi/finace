import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Avatar,
  HStack,
  IconButton,
  StackDivider,
  Tooltip,
  Button,
  Textarea,
  Flex,
  Badge,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import {
  FaThumbsUp,
  FaComment,
  FaShareAlt,
  FaEllipsisV,
  FaBookmark,
} from "react-icons/fa";

interface Post {
  id: number;
  content: string;
  author: string;
  time: string;
  likes: number;
  comments?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface CommunityFeedProps {
  posts: Post[];
  isLoading?: boolean;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({
  posts,
  isLoading = false,
}) => {
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [showComments, setShowComments] = useState<number[]>([]);

  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const handleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
    toast({
      title: likedPosts.includes(postId) ? "Post unliked" : "Post liked",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
    toast({
      title: bookmarkedPosts.includes(postId)
        ? "Removed from bookmarks"
        : "Added to bookmarks",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share feature coming soon!",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      toast({
        title: "Post created successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setNewPost("");
    }
  };

  if (isLoading) {
    return (
      <VStack spacing={4} align="stretch">
        {[1, 2, 3].map((item) => (
          <Box key={item} p={6} borderWidth={1} borderRadius="md" bg={bgColor}>
            <HStack spacing={4} mb={4}>
              <Skeleton height="32px" width="32px" borderRadius="full" />
              <Skeleton height="20px" width="150px" />
            </HStack>
            <Skeleton height="60px" mb={4} />
            <Skeleton height="20px" width="100px" />
          </Box>
        ))}
      </VStack>
    );
  }

  return (
    <Box>
      {/* New Post Creation */}
      <Box mb={6} p={4} borderWidth={1} borderRadius="md" bg={bgColor}>
        <Textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          mb={4}
          resize="vertical"
        />
        <Button
          colorScheme="teal"
          isDisabled={!newPost.trim()}
          onClick={handleSubmitPost}
        >
          Post
        </Button>
      </Box>

      <VStack
        spacing={4}
        divider={<StackDivider borderColor={borderColor} />}
        align="stretch"
      >
        {posts.map((post) => (
          <Box
            key={post.id}
            p={6}
            borderWidth={1}
            borderRadius="md"
            bg={bgColor}
            _hover={{
              transform: "translateY(-2px)",
              transition: "transform 0.2s",
              boxShadow: "md",
            }}
          >
            <Flex justify="space-between" align="center">
              <HStack spacing={4}>
                <Avatar name={post.author} size="sm" />
                <Box>
                  <Text fontSize="md" fontWeight="bold">
                    {post.author}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    {post.time}
                  </Text>
                </Box>
              </HStack>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FaEllipsisV />}
                  variant="ghost"
                  aria-label="More options"
                  size="sm"
                />
                <MenuList>
                  <MenuItem>Report Post</MenuItem>
                  <MenuItem>Mute User</MenuItem>
                  <MenuItem>Copy Link</MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Text mt={4} fontSize="md">
              {post.content}
            </Text>

            <Flex mt={4} justify="space-between" align="center">
              <HStack spacing={4}>
                <Tooltip
                  label={likedPosts.includes(post.id) ? "Unlike" : "Like"}
                >
                  <IconButton
                    icon={<FaThumbsUp />}
                    variant="ghost"
                    colorScheme={likedPosts.includes(post.id) ? "teal" : "gray"}
                    aria-label="Like"
                    onClick={() => handleLike(post.id)}
                    size="sm"
                  />
                </Tooltip>
                <Text fontSize="sm" color="gray.500">
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </Text>

                <Tooltip label="Comment">
                  <IconButton
                    icon={<FaComment />}
                    variant="ghost"
                    colorScheme={
                      showComments.includes(post.id) ? "teal" : "gray"
                    }
                    aria-label="Comment"
                    onClick={() =>
                      setShowComments((prev) =>
                        prev.includes(post.id)
                          ? prev.filter((id) => id !== post.id)
                          : [...prev, post.id]
                      )
                    }
                    size="sm"
                  />
                </Tooltip>

                <Tooltip label="Share">
                  <IconButton
                    icon={<FaShareAlt />}
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="Share"
                    onClick={handleShare}
                    size="sm"
                  />
                </Tooltip>
              </HStack>

              <Tooltip
                label={
                  bookmarkedPosts.includes(post.id)
                    ? "Remove Bookmark"
                    : "Bookmark"
                }
              >
                <IconButton
                  icon={<FaBookmark />}
                  variant="ghost"
                  colorScheme={
                    bookmarkedPosts.includes(post.id) ? "teal" : "gray"
                  }
                  aria-label="Bookmark"
                  onClick={() => handleBookmark(post.id)}
                  size="sm"
                />
              </Tooltip>
            </Flex>

            {showComments.includes(post.id) && (
              <Box mt={4} pt={4} borderTopWidth={1} borderColor={borderColor}>
                <Textarea
                  placeholder="Write a comment..."
                  size="sm"
                  mb={2}
                  resize="vertical"
                />
                <Button size="sm" colorScheme="teal">
                  Comment
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CommunityFeed;
