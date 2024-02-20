import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import contractaddress from "../artifacts/addresses/contract-address.json"
import { Link } from 'react-router-dom';
import {Table, Button} from 'antd'
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
    const fetchedProducts = await contract.getAllProducts();
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Quantity</th>
            </tr>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>
                  <Link to={`/product-details/${product.id}`}>{product.id ? product.id.toString() : ''}</Link>
                </td>
                <td>{product.name}</td>
                <td>
                  {product.ingredients.join(', ')}
                </td>
                <td>
                  {product.quantity.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button type='primary'><a href = "/product">Add Data</a></Button>
    </div>
  );
  

 }

export default FMDashboard;
