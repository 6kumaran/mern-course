import ProductCard from '../components/ProductCard';
import { useProductStore } from '../store/product';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
  const {fetchProducts, products}=useProductStore();
  useEffect(() => {fetchProducts();}, [fetchProducts]);
  console.log("Products ",products);
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
          Current Products 
        </Text>
        <SimpleGrid columns={{base:1,md:2,lg:3}} spacing={10} w={"full"}>
          {products.map((product) =>(
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </SimpleGrid>
        {products.length===0 && (
          <Text fontSize='xl' fontWeight={"bold"} textAlign={"center"} color='gray.500'>
          No Products Found 😢 {" "}
          <Link to={"/create"}>
            <Text as='span' color={'blue.500'} _hover={{textDecoration: "underline"}}>
              Create a new Product.
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage;