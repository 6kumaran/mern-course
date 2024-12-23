import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode} from './ui/color-mode';
import { IoMoon } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";

const Navbar = () => {
  const {colorMode, toggleColorMode}=useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{
        base: "column",
        sm: "row"
      }}>
        <Text fontSize={{base:"22px", sm:"28px"}} fontWeight={"bold"} >
          <Link to={"/"}>Weard Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
          <Button>
          <CiSquarePlus />
          </Button>
          </Link>
          <Button onClick={toggleColorMode}>{colorMode === "light"?<IoMoon />:<IoIosSunny/>}</Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar