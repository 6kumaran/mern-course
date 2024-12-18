import { useProductStore } from '../store/product';
import { useColorModeValue } from '../components/ui/color-mode';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';

const CreatePage = () => {
  const [newProduct, setNewProduct]= useState({
    name:"",
    price:"",
    image:"",
  })
  const {createProduct}= useProductStore()
  const handleAddProduct = async() => {
    const {success,message}=await createProduct(newProduct);
    if(!success){
      toast.error(message || "An error occurred");
    }else{
      toast.success(message || "Product created successfully");
    }
    setNewProduct({ name: "", price: "", image: "" });
  }
  return (
    <Container>
      <Toaster position="bottom-center" reverseOrder={false} />
      <VStack spacing={8}>
        <Heading as={'h1'} size={"2xl"} textAlign={"center"} mb={8}>Creat New Product</Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.900")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input placeholder='Product Name' name='name' value={newProduct.name} onChange={(e)=>setNewProduct({...newProduct, name:e.target.value})}/>
            <Input placeholder='Price' name='price' type='number' value={newProduct.price} onChange={(e)=>setNewProduct({...newProduct, price:e.target.value})}/>
            <Input placeholder='Image URL' name='image' value={newProduct.image} onChange={(e)=>setNewProduct({...newProduct, image:e.target.value})}/>
            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage;