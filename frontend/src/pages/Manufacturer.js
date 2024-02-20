import React from 'react'
import { Card,Form, Input, Button, message } from 'antd';
import contractaddress from "../artifacts/addresses/contract-address.json"
import { useNavigate } from 'react-router-dom';
import {Toaster, toast} from "react-hot-toast"
import { PlusOutlined } from '@ant-design/icons';
import Web3 from 'web3'

const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi

const {ethers}=require("ethers") 
const Manufacturer = () => {
  const[form]=Form.useForm()
  const navigate=useNavigate()
  const contractAddress=contractaddress
const contractABI=abi
  const onFinish=async(values)=>{
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Request account access from the user
      await provider.send("eth_requestAccounts", []);
  
      // Get the signer
      const signer = provider.getSigner();

      // Create a contract instance

      let web3=new Web3(Web3.givenProvider||"http://localhost:8545")
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      // Ensure ingredients is an array
    let ingredients = values.ingredients;
    if (typeof ingredients === 'string') {
      ingredients = ingredients.split(',').map(item => item.trim());
    }
    if (!Array.isArray(ingredients)) {
      throw new Error('Ingredients must be an array or a comma-separated string');
    }
      // Ensure quantity is an array of unsigned integers
    let quantities = values.quantity;
    if (typeof quantities === 'string') {
      // If quantities is a string, split it by comma and convert each item to a number
      quantities = quantities.split(',').map(item => parseInt(item,  10));
    }
    if (!Array.isArray(quantities) || quantities.some(isNaN)) {
      throw new Error('Quantity must be an array of numbers');
    }
      if(values!=null){
        await contract.addProduct(values.id,values.name,ingredients,quantities,values.intendedUse,values.functionalUse,values.manufacturingProcess,values.nutritionalBenefits,values.fatPercentage,values.proteinPercentage,values.carbohydratePercentage)
        message.success('Product added!')
        const firstproduct=await contract.getProduct(0)
        console.log(firstproduct)
        // console.log(contract)
        form.resetFields()
      }
      else {
        alert("error adding");
        return;
      }
      toast('Details Saved!', {
        icon: '👏',
      });
      setTimeout(() => {
				navigate("/fmdashboard");
			}, 2000); 

    
    }
    catch(error){
      console.error(error)
      //alert("Not authorized")
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster />
      <Card className="w-full max-w-lg m-10 shadow-xl">
      <div className="flex justify-center items-center">
        <img
              src="https://img.freepik.com/free-vector/set-tin-food_1308-26262.jpg?t=st=1708369378~exp=1708372978~hmac=b2527e9ab3922bcabb13a1feb09b83d872ac344ef9e2df8d06f42aa8d3832591&w=826"
              alt="Privacy policy concept illustration"
              className="object-cover rounded-lg w-3/6 h-2/6 "
            />
      </div>
      <div className="flex  mb-6">
      
        <PlusOutlined className="bg-blue-700 p-2 rounded-full text-white" />
        <h1 className="text-xl font-bold ml-4">Add Food product details</h1>
        
      </div>
      <Form form={form} onFinish={onFinish}>
      <Form.Item name="id" label="Id" rules={[{required:true}]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="ingredients" label="Ingredients" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="intendedUse" label="Intended Use" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="functionalUse" label="Functional Use" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="manufacturingProcess" label="Manufacturing Process" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="nutritionalBenefits" label="Nutritional Benefits" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="fatPercentage" label="Fat Percentage" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="proteinPercentage" label="Protein Percentage" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="carbohydratePercentage" label="Carbohydrate Percentage" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      {/* tbd */}
      
      <Form.Item>
        <Button type="primary" htmlType="submit" className='bg-blue-700'>
          Add Product
        </Button>
      </Form.Item>
      
      </Form>
    
      </Card>
    </div>
  )
}

export default Manufacturer
