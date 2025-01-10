import { Box, Text } from "@chakra-ui/react";
import MentorCard from "./MentorCard";

type MentorRecommendationsProps = {
  mentors: {
    name: string;
    bio: string;
    expertise: string[];
    location: string;
  }[];
};

const MentorRecommendations: React.FC<MentorRecommendationsProps> = ({
  mentors,
}) => {
  return (
    <Box mb={8}>
      <Text fontSize="2xl" mb={4} fontWeight="bold" size="lg">
        Mentor Recommendations
      </Text>
      {mentors.map((mentor, index) => (
        <MentorCard
          key={index}
          name={mentor.name}
          bio={mentor.bio}
          expertise={mentor.expertise}
          location={mentor.location}
        />
      ))}
    </Box>
  );
};

export default MentorRecommendations;
