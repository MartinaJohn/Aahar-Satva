import {React,useState,useEffect} from 'react'
import QRcode from "../components/QRCode";
import { useParams } from 'react-router-dom';
import { Button, Flex, QRCode } from 'antd';
import abi from "../artifacts/contracts/Crusader.sol/Crusader.json"
import contractaddress from "../artifacts/addresses/contract-address.json"

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
        const product = await contract.getProductById(id);
        //console.log(sample.timestamp)
        setProduct(product);
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
                    <p><b>Intended use: </b>{product.intendedUse}</p>
                    <p><b>Carbohydrate percentage: </b>{product.carbohydratePercentage.toString()}</p>
                    <p><b>Fat percentage: </b>{product.fatPercentage.toString()}</p>
                    <p><b>Protein percentage: </b>{product.proteinPercentage.toString()}</p>
                    <p><b>Manufacturing process: </b>{product.manufacturingProcess}</p>
                    <QRcode id={product.id.toString()}/>
            </>
            
        )
      }
    </div>
  )
}

export default FullProductDetails
