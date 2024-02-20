import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import contractaddress from "../artifacts/addresses/contract-address.json"
import { Link } from 'react-router-dom';

const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi


const FMDashboard = () => {
    const[products,setProducts]=useState([])
    async function fetchProducts(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
   console.log(provider)
   // Request account access from the user
   await provider.send("eth_requestAccounts", []);

   // Get the signer
   const signer = provider.getSigner();

   // Create a contract instance
   const contractABI=abi
   const contract = new ethers.Contract(contractaddress, contractABI, signer);
        const samples = await contract.getProduct();
    console.log(samples)

   setProducts()
    }
    useEffect(()=>{
        fetchProducts()
    },[])
  return (
    <div>
      <div className="tablestyles">
        <table>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Ingredients</th>
                    <th>Quantities</th>
                    <th>Itended use</th>
                    <th>Functional use</th>
                    <th>Manufacturing process</th>
                    <th>Nutritional benefits</th>
                    <th>Quantities</th>
                    <th>Fat  %</th>
                    <th>Protein  %</th>
                    <th>Fat  %</th>
                </tr>
                
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default FMDashboard
