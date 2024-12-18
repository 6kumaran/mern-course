
import Modal from 'react-modal';
import { Box, Button, Heading, HStack, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useColorModeValue } from './ui/color-mode'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useProductStore } from '../store/product';
import { toast, Toaster } from 'react-hot-toast';
const ProductCard = ({product}) => {
  Modal.setAppElement('#root');
  const [isOpen, setIsOpen] = React.useState(false);
  const [updatedProduct,setUpdatedProduct] = useState(product); 
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const textcolor = useColorModeValue("gray.600", "gray.200");
    const bg=useColorModeValue("white", "gray.800");
    const {updateProduct,deleteProduct}= useProductStore()
    const handleUpdateProduct = async (pid, updatedProduct) => {
      const {success,message} =await updateProduct(pid, updatedProduct);
      closeModal();
      if(!success){
            toast.error(message || "An error occurred");
          } else{
            toast.success(message || "Product Updated Successfully");
          }
    }
    const handleDeleteProduct = async (pid) => {
      const {success, message} = await deleteProduct(pid)
      if(!success){
            toast.error(message || "An error occurred");
          }else{
            toast.success(message || "Product Deleted successfully");
          }
    }
  return (
    <Box m={6} shadow={'lg'} rounded={'lg'} overflow={'hidden'} transition={'all 0.3s'} _hover={{transform:"translateY(-5px)", shadow:"xl"}} bg={bg}>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}>{product.name}</Heading>
            <Text fontWeight={'bold'} fontSize={'xl'} color={textcolor} mb={4}>${product.price}</Text>
            <HStack spacing={2}>
              <Button bg="blue.300" onClick={openModal}><FaEdit /></Button> 
              <Button bg="red.300" onClick={()=>handleDeleteProduct(product._id)}><MdDeleteForever /></Button> 
            </HStack>
        </Box>
        <Modal isOpen={isOpen}
          onRequestClose={closeModal}
          style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: {margin: 'auto',maxWidth: '350px',borderRadius: '8px',height: 'fit-content',}
        }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold', color: '#444'}}>Update Product</h2>
        <input placeholder="Product Name" name='name' value={updatedProduct.name}
        onChange={(e)=> setUpdatedProduct({...updatedProduct,name: e.target.value})}
          style={{width: '100%',marginBottom: '12px',padding: '8px',border: '1px solid #ccc',borderRadius: '4px',
          backgroundColor: '#fff', // White background for inputs
          color: '#444', // Dark text color
        }}/>
        <input placeholder="Price" type="number" name='price' value={updatedProduct.price}
        onChange={(e)=>setUpdatedProduct({...updatedProduct,price: e.target.value})}
          style={{width: '100%',marginBottom: '12px',padding: '8px',border: '1px solid #ccc',borderRadius: '4px',
          backgroundColor: '#fff', // White background for inputs
          color: '#444',
        }}/>
        <input placeholder="Image URL" name='image' value={updatedProduct.image}
        onChange={(e)=>setUpdatedProduct({...updatedProduct,image: e.target.value})}
          style={{width: '100%',marginBottom: '12px',padding: '8px',border: '1px solid #ccc',borderRadius: '4px',
          backgroundColor: '#fff', // White background for inputs
          color: '#444',
        }}/>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button bg="red.300"onClick={closeModal} colorScheme="red" size="sm">Close</Button>
          <Button Button bg="blue.300" colorScheme="blue" size="sm" onClick={()=>handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
        </div>
        </Modal>
     </Box>
   )
 }

export default ProductCard

 // Set the root element for accessibility


