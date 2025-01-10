import React from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Flex,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaEllipsisH,
} from "react-icons/fa";

interface PostCardProps {
  content: string;
  author: string;
  time: string;
  avatarUrl?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  authorRole?: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  content,
  author,
  time,
  avatarUrl,
  likes = 0,
  comments = 0,
  shares = 0,
  isLiked = false,
  isBookmarked = false,
  authorRole,
  onLike,
  onComment,
  onShare,
  onBookmark,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const mutedColor = useColorModeValue("gray.500", "gray.400");
  const highlightColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Box
      borderWidth={1}
      borderColor={borderColor}
      bg={bgColor}
      p={6}
      borderRadius="lg"
      mb={4}
      _hover={{
        transform: "translateY(-2px)",
        transition: "all 0.2s",
        boxShadow: "md",
      }}
    >
      <Flex justify="space-between" align="flex-start">
        <HStack spacing={4}>
          <Avatar
            name={author}
            src={avatarUrl}
            size="md"
            _hover={{
              transform: "scale(1.1)",
              transition: "all 0.2s",
            }}
          />
          <VStack align="flex-start" spacing={0}>
            <HStack>
              <Text fontWeight="bold" fontSize="md">
                {author}
              </Text>
              {authorRole && (
                <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                  {authorRole}
                </Badge>
              )}
            </HStack>
            <Text fontSize="sm" color={mutedColor}>
              {time}
            </Text>
          </VStack>
        </HStack>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisH />}
            variant="ghost"
            size="sm"
            aria-label="More options"
          />
          <MenuList>
            <MenuItem>Report post</MenuItem>
            <MenuItem>Copy link</MenuItem>
            <MenuItem>Mute author</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Text mt={4} color={textColor} whiteSpace="pre-wrap">
        {content}
      </Text>

      <HStack mt={6} spacing={8} justify="space-between">
        <HStack spacing={6}>
          <Tooltip label={isLiked ? "Unlike" : "Like"}>
            <IconButton
              aria-label="Like post"
              icon={isLiked ? <FaHeart /> : <FaRegHeart />}
              variant="ghost"
              color={isLiked ? "red.500" : mutedColor}
              onClick={onLike}
              _hover={{ color: "red.500" }}
            />
          </Tooltip>
          <Text fontSize="sm" color={mutedColor}>
            {likes > 0 && likes}
          </Text>

          <Tooltip label="Comment">
            <IconButton
              aria-label="Comment"
              icon={<FaComment />}
              variant="ghost"
              color={mutedColor}
              onClick={onComment}
              _hover={{ color: highlightColor }}
            />
          </Tooltip>
          <Text fontSize="sm" color={mutedColor}>
            {comments > 0 && comments}
          </Text>

          <Tooltip label="Share">
            <IconButton
              aria-label="Share post"
              icon={<FaShare />}
              variant="ghost"
              color={mutedColor}
              onClick={onShare}
              _hover={{ color: highlightColor }}
            />
          </Tooltip>
          <Text fontSize="sm" color={mutedColor}>
            {shares > 0 && shares}
          </Text>
        </HStack>

        <Tooltip label={isBookmarked ? "Remove bookmark" : "Bookmark"}>
          <IconButton
            aria-label="Bookmark post"
            icon={isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            variant="ghost"
            color={isBookmarked ? highlightColor : mutedColor}
            onClick={onBookmark}
            _hover={{ color: highlightColor }}
          />
        </Tooltip>
      </HStack>
    </Box>
  );
};

export default PostCard;
