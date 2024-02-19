import React from 'react'
import { Form, Input, Button, message } from 'antd';
import contractaddress from "../artifacts/addresses/contract-address.json"
import { useNavigate } from 'react-router-dom';
import {Toaster, toast} from "react-hot-toast"
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
        await contract.addProduct(values.name,ingredients,quantities,values.intendedUse,values.functionalUse,values.manufacturingProcess,values.nutritionalBenefits,values.fatPercentage,values.proteinPercentage,values.carbohydratePercentage)
        message.success('Product added!')
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
				navigate("/dashboard");
			}, 2000); 

    
    }
    catch(error){
      console.error(error)
      alert("Not authorized")
    }
  }
  return (
    <div>
      <Toaster />
      <h1>Food product details</h1>
      <Form form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="ingredients" label="Ingredients" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
        <Input.TextArea />
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
      </Form>
    </div>
  )
}

export default Manufacturer
