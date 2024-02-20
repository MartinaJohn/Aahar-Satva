import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import contractaddress from "../artifacts/addresses/contract-address.json"
import { Link } from 'react-router-dom';
import {Table} from 'antd'
const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi


 const FMDashboard = () => {
    const [products, setProducts] = useState([]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Get the signer
    const signer = provider.getSigner();
 
    // Create a contract instance
    const contractABI=abi
    const contract = new ethers.Contract(contractaddress, contractABI, signer);
  // Function to fetch products from the smart contract
  const fetchProducts = async () => {
    // Assuming you have a method to get the total number of products
    const totalProducts = await contract.getTotalProducts();
    const fetchedProducts = [];

    for (let i =  0; i < totalProducts; i++) {
      const product = await contract.getProduct(i);
      fetchedProducts.push(product);
    }

    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Define the columns for the AntD table
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Ingredients', dataIndex: 'ingredients', key: 'ingredients', render: ingredients => (
      <span>{ingredients.join(', ')}</span>
    )},
    
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', render: quantity => (
      <span>{quantity.join(', ')}</span>
    )},
    {
        title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => (
        <Link to={`/product-sample-details/${id}`}>{id ? id.toString() : ''} id</Link>
      ),
      }
    // Add more columns for other properties
  ];

  return (
    <Table columns={columns} dataSource={products} rowKey="id" />
  );
}
export default FMDashboard;
