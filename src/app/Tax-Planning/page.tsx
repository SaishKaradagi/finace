"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const TaxPlanningPage = () => {
  const [income, setIncome] = useState("");
  const [tax, setTax] = useState(0);
  const [investment, setInvestment] = useState(0);

  const calculateTax = () => {
    const incomeValue = parseFloat(income);
    if (!isNaN(incomeValue)) {
      let taxableIncome = incomeValue - investment;
      if (taxableIncome > 250000) {
        setTax((taxableIncome - 250000) * 0.05); // 5% for income above ₹2.5L
      } else {
        setTax(0);
      }
    }
  };

  return (
    <Box p={5} maxW="800px" mx="auto">
      <Heading as="h1" mb={4} textAlign="center" color="teal.500">
        Tax Planning for Rural Women
      </Heading>
      <Text fontSize="lg" mb={6}>
        Simplify your tax planning journey with personalized insights and tools.
      </Text>

      {/* Personalized Recommendations */}
      <Box borderWidth="1px" borderRadius="lg" p={5} mb={6}>
        <Heading as="h2" size="md" mb={4}>
          Tax Calculator & Recommendations
        </Heading>
        <VStack spacing={3}>
          <Input
            placeholder="Enter your annual income (₹)"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <Text>Investment in Tax Saving Tools (e.g., PPF, NPS):</Text>
          <Slider
            defaultValue={0}
            min={0}
            max={150000}
            step={1000}
            onChange={(val) => setInvestment(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>Investment: ₹{investment}</Text>
          <Button colorScheme="teal" onClick={calculateTax}>
            Calculate Tax
          </Button>
          <Text fontSize="lg" fontWeight="bold">
            Estimated Tax: ₹{tax.toFixed(2)}
          </Text>
        </VStack>
      </Box>

      {/* Government Scheme Integration */}
      <Box borderWidth="1px" borderRadius="lg" p={5} mb={6}>
        <Heading as="h2" size="md" mb={4}>
          Government Schemes for You
        </Heading>
        <Text mb={2}>
          - <strong>Sukanya Samriddhi Yojana:</strong> Save tax while securing
          your daughter's future. - <strong>PM Udyami Yojana:</strong> Financial
          support for women entrepreneurs.
        </Text>
        <Button colorScheme="blue" size="sm">
          Learn More
        </Button>
      </Box>

      {/* Tax Filing Checklist */}
      <Box borderWidth="1px" borderRadius="lg" p={5} mb={6}>
        <Heading as="h2" size="md" mb={4}>
          Tax Filing Checklist
        </Heading>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Gather Your Documents
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              PAN card, Aadhaar, income statements, investment proofs, etc.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Calculate Your Taxable Income
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              Deduct exemptions and deductions from your total income.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                File Your Tax Return
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              Use the government portal or consult a tax professional.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      {/* Knowledge Quiz */}
      <Box borderWidth="1px" borderRadius="lg" p={5}>
        <Heading as="h2" size="md" mb={4}>
          Test Your Knowledge
        </Heading>
        <Text mb={4}>
          Take a quiz to see how much you know about tax planning!
        </Text>
        <Button colorScheme="purple" size="sm">
          Start Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default TaxPlanningPage;
