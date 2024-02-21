// import { ethers } from 'ethers';
// import React, { useEffect, useState } from 'react';
// import contractaddress from "../artifacts/addresses/contract-address.json";
// import { Link } from 'react-router-dom';
// import { LinkOutlined } from '@ant-design/icons';
// import { Table } from 'antd';

// const abi = require('../artifacts/contracts/Crusader.sol/Crusader.json').abi;

// const FMDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [bannerSrc, setBannerSrc] = useState(''); // State for storing the source link of the banner image

//   const provider = new ethers.providers.Web3Provider(window.ethereum);

//   // Get the signer
//   const signer = provider.getSigner();

//   // Create a contract instance
//   const contractABI = abi;
//   const contract = new ethers.Contract(contractaddress, contractABI, signer);

//   // Function to fetch products from the smart contract
//   const fetchProducts = async () => {
//     // Assuming you have a method to get the total number of products 
//     const totalProducts = await contract.getTotalProducts();
//     const fetchedProducts = [];

//     for (let i = 0; i < totalProducts; i++) {
//       const product = await contract.getProduct(i);
//       fetchedProducts.push(product);
//     }

//     setProducts(fetchedProducts);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

  

//   // Define the columns for the AntD table
//   const columns = [
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Ingredients', dataIndex: 'ingredients', key: 'ingredients', render: ingredients => (
//       <span>{ingredients.join(', ')}</span>
//     )},
//     { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', render: quantity => (
//       <span>{quantity.join(', ')}</span>
//     )},
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//       render: (id, record) => (
//         <Link to={`/product-details/${id}`} className="hover:bg-FFF8EB hover:text-black flex items-center justify-end">
//           {id ? id.toString() : ''}
//           <LinkOutlined style={{ marginLeft: '5px', color:'red'  }} /> 
//         </Link>
//       ),
//     }
//   ];

//   return (
//     <div>
      
      
//       <section className="bg-cover bg-center bg-no-repeat mt-12 h-4/6 " style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/decorative-korean-food-template_188544-2664.jpg?w=740')" }}>
//       <div className="container mx-auto pt-10 px-4 flex flex-col justify-start items-center h-full text-brown ">
//         <h1 className="text-4xl font-bold mb-4 sm:text-5xl text-center">Food Product Details</h1>
//         <p className="text-lg mb-8 sm:text-xl text-center">Explore detailed information about your food products</p>
     
//       </div>
//     </section>

//       <div className="shadow-2xl m-16">
//         <Table columns={columns} dataSource={products} rowKey="id" bordered={true} />
//       </div>
//     </div>
//   );
// };

// export default FMDashboard;
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
); }

export default FMDashboard;