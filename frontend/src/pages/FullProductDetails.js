import {React,useState,useEffect} from 'react'
import QRcode from "../components/QRCode";
import { useParams } from 'react-router-dom';
import { Button, Flex, QRCode } from 'antd';

import contractaddress from "../artifacts/addresses/contract-address.json"
const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi
const{ethers}=require("ethers")
const FullProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    async function fetchProduct() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractABI=abi.abi
        const contract = new ethers.Contract(contractaddress, contractABI, signer);
        const sample = await contract.getProductById(id);
        console.log(sample.timestamp)
        setProduct(sample);
    }
    useEffect(() => {
        fetchProduct();
    }, [id]);
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        return date.toLocaleTimeString('en-US'); // Format to "hh:mm AM/PM"
    };

  return (
    <div>
      <h1>Product details</h1>
      {
        product && (
            <>
            <p><b>Name: </b>{product.name}</p>
                    <p><b>Id: </b>{product.id.toString()}</p>
                    {/* <p><b>Ingredient </b>{bloodSample.ingredu=.toString()}</p> */}
                    <p><b>Blood Group: </b>{product.intendedUse}</p>
                    <p><b>Carbohydrate: </b>{product.carbohydratePercentage}</p>
                    <p><b>Fat percentage: </b>{product.fatPercentage}</p>
                    <p><b>Protein percentage: </b>{product.proteinPercentage}</p>
                    <p><b>Manufacturing process: </b>{product.manufacturingProcess}</p>
                    <QRCode id={product.id.toString()}/>
            </>
        )
      }
    </div>
  )
}

export default FullProductDetails
