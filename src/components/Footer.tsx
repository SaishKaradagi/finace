import { Box, Flex, Text, HStack, Link, Icon } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      borderTop="1px"
      borderColor="gray.300"
      bg="gray.50" // Subtle light gray background
      color="gray.700" // Dark gray text to ensure readability
    >
      <Box maxW="7xl" mx="auto" px={4} py={2}>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          align="center"
          justify="center"
          textAlign="center"
        >
          {/* Copyright */}
          <Text fontSize="sm" mb={{ base: 2, sm: 0 }}>
            &copy; 2025 AarthikSakhi. All rights reserved.
          </Text>

          {/* Social Links */}
          <HStack spacing={4} ml={{ sm: 4 }}>
            <Link href="https://www.linkedin.com/company/0xmetaschool/" isExternal>
              <Icon viewBox="0 0 24 24" boxSize={5} color="gray.700">
                <path
                  fill="currentColor"
                  d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
                />
              </Icon>
            </Link>

            
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
