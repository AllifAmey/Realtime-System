import { useState, useEffect } from "react";
import { Flex, Box, Heading, Button, Text, Checkbox } from "@chakra-ui/react";
import { useWebSocket } from "./hooks/useWebSocket";

const IN_RACE_API_BASE_URL = "ws://localhost:8000/ws";
const RACEIQ_API_BASE_URL = "ws://http://localhost:8001";
const BROADCAST_API_BASE_URL = "ws://http://localhost:8002";
const THIRD_PARTY_API_BASE_URL = "ws://http://localhost:8003";

const RACE_1_URL = `${IN_RACE_API_BASE_URL}/1`;
const RACE_2_URL = `${IN_RACE_API_BASE_URL}/2`;

function App() {
  const [count, setCount] = useState(0);
  const {
    messages: inRaceRunnerMessages,
    stopWebSocket: inRaceRunnerStop,
    startWebSocket: inRaceRunnerStart,
    sendMessage: inRaceSendMessage,
  } = useWebSocket(IN_RACE_API_BASE_URL);
  const {
    messages: raceOneMessages,
    stopWebSocket: raceOneStop,
    startWebSocket: raceOneStart,
    sendMessage: raceOneMessage,
  } = useWebSocket(RACE_1_URL);
  const {
    messages: raceTwoMessages,
    stopWebSocket: raceTwoStop,
    startWebSocket: raceTwoStart,
    sendMessage: raceTwoMessage,
  } = useWebSocket(RACE_2_URL);
  // > uvicorn backend/in_race_api:app --reload
  console.log(inRaceRunnerMessages);
  return (
    <Flex direction="column" w="100%" h="100%" alignItems="center" gap="2rem">
      <Heading>In Race POC</Heading>
      <Flex justifyContent="space-evenly" w="100%">
        <Flex direction="column" flex={1} alignItems="center">
          <Text>
            <b>Broadcast</b> API
          </Text>
          <Box h="70vh" overflow="auto"></Box>
          <Button mb="1rem">Recieve Broadcast</Button>
          <Flex gap="1rem" alignItems="center">
            <Text>Sectionals</Text>
            <Button colorScheme="blue">Runner</Button>
            <Button colorScheme="red">Race</Button>
          </Flex>
        </Flex>
        <Flex direction="column" flex={1} alignItems="center">
          <Text>
            <b>RaceIQ</b> API
          </Text>
          <Box h="70vh" overflow="auto">
            {inRaceRunnerMessages.map((message, idx) => {
              return <div key={idx}>{message}</div>;
            })}
            {raceOneMessages.map((message, idx) => {
              return <div key={idx}>{message}</div>;
            })}
            {raceTwoMessages.map((message, idx) => {
              return <div key={idx}>{message}</div>;
            })}
          </Box>
          <Checkbox
            colorScheme="blue"
            onChange={(e) => {
              if (e.target.checked) {
                inRaceRunnerStart();
              } else {
                inRaceRunnerStop();
              }
            }}
            size="lg"
            mb="1rem"
          >
            Recieve Runner Sectionals
          </Checkbox>
          <Flex gap="1rem" alignItems="center">
            <Text>Sectionals</Text>
            <Checkbox
              colorScheme="blue"
              onChange={(e) => {
                if (e.target.checked) {
                  raceOneStart();
                } else {
                  raceOneStop();
                }
              }}
              size="lg"
              mb="1rem"
            >
              Race 1
            </Checkbox>
            <Checkbox
              colorScheme="blue"
              onChange={(e) => {
                if (e.target.checked) {
                  raceTwoStart();
                } else {
                  raceTwoStop();
                }
              }}
              size="lg"
              mb="1rem"
            >
              Race 2
            </Checkbox>
          </Flex>
        </Flex>
        <Flex direction="column" flex={1} alignItems="center">
          <Text>
            <b>Third Party</b> API
          </Text>
          <Box h="70vh" overflow="auto"></Box>
          <Button mb="1rem">Recieve Third Party</Button>
          <Flex gap="1rem" alignItems="center">
            <Text>Sectionals</Text>
            <Button colorScheme="red">Runner</Button>
            <Button colorScheme="blue">Race</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
