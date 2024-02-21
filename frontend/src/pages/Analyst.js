import { BrowserMultiFormatReader } from '@zxing/browser';
import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { Form, Input, Button, Card, Select } from "antd";

import contractaddress from "../artifacts/addresses/contract-address.json"
const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi

window.Buffer = window.Buffer || require("buffer").Buffer;
const projectId = "2OFpkjdSKUiJCRJfbI9QRZRICV8";
const projectSecret = "6eeb6d7bf188824bfb895b953c98ae08";
const { ethers } = require("ethers");

const auth =
  "Basic" +
  " " +
  Buffer.from(projectId + ":" + projectSecret).toString("base64");

const Analyst = () => {
  
  const [result, setResult] = useState('');
  const contractAddress = contractaddress
  const contractABI=abi
  

  const handleUpload =async(values)=>{
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    await provider.send("eth_requestAccounts", []);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
      contract.setManufacturerReport(hash)
      console.log(hash)
    }
    catch(error){}
  }
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target.result;
        const qrCodeReader = new BrowserMultiFormatReader();
        try {
          const result = await qrCodeReader.decodeFromImageUrl(imageUrl);
          setResult(result.text);
        } catch (err) {
          console.error(err);
          setResult('Error reading QR code');
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
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

  return (
    <div>
     <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
       <p>{result}</p>
     </div>
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
      <Button onClick={handleUpload}>Upload geo-tagged image</Button>
    </div>
  );
};

export default Analyst;