import {React,useEffect,useState} from 'react'
// import FileUpload from '../components/FileUpload'
import { Form, Input, Button, Card, Select } from "antd";
import contractaddress from "../artifacts/addresses/contract-address.json"

import { create } from "ipfs-http-client";
window.Buffer = window.Buffer || require("buffer").Buffer;
const projectId = "2OFpkjdSKUiJCRJfbI9QRZRICV8";
const projectSecret = "6eeb6d7bf188824bfb895b953c98ae08";
const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi
const { ethers } = require("ethers");
const { Option } = Select;

const auth =
  "Basic" +
  " " +
  Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ManufacturerCompany = () => {
  const[hashUpload,setHashUpload]=useState(false)
  const contractAddress = contractaddress

  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);
  const [link, setLink] = useState(null);

  const ipfsClient = async () => {
    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      apiPath: "/api/v0",
      headers: {
        authorization: auth,
      },
    });
    return ipfs;
  };

  const uploadFile = async () => {
    let ipfs = await ipfsClient();
    const result = await ipfs.add(file);
    console.log(result);
    setHash(result.path);
    setLink("https://educhain.infura-ipfs.io/ipfs/" + result.path);
  };

  const getPdf = async () => {
    let ipfs = await ipfsClient();
    const chunks = [];
    for await (const chunk of ipfs.cat(hash)) {
      chunks.push(chunk);
    }

    const data = Buffer.concat(chunks);
    const fileName = `${hash}.pdf`;

    const file = new File([data], fileName, {
      type: "application/pdf",
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = fileName;
    downloadLink.click();
   
  };

  const contractABI=abi
  

  const handleUpload =async(values)=>{
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    await provider.send("eth_requestAccounts", []);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
      contract.setManufacturerAadhar(hash)
      console.log(hash)
    }
    catch(error){}
  }
  return (
    <div>
    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    <button onClick={uploadFile}>Upload</button>
    <br />
    {hash && (
      <p>
        File uploaded with hash:
        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
      </p>
    )}

    {hash && <p>Hash: {hash}</p>}
    
    <br />
    <button onClick={getPdf}>Get</button>
      <Button onClick={handleUpload}>Upload</Button>
  </div>
  )
}

export default ManufacturerCompany