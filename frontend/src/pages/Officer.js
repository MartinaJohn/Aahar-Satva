// import React, { useState, useEffect, useRef } from 'react';

// const Officer = () => {
//   const [speech, setSpeech] = useState({
//     enabled: true,
//     listening: false,
//     recognition: null,
//     text: ''
//   });

//   const resultRef = useRef(null);
//   const toggleRef = useRef(null);

//   useEffect(() => {
//     window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
//       setSpeech((prevSpeech) => ({
//         ...prevSpeech,
//         recognition: new window.SpeechRecognition(),
//       }));
//     }
//   }, []);

//   useEffect(() => {
//     if (speech.recognition) {
//       speech.recognition.continuous = true;
//       speech.recognition.interimResults = true;
//       speech.recognition.lang = 'en-US';

//       speech.recognition.addEventListener('result', (event) => {
//         const audio = event.results[event.results.length -  1];
//         setSpeech((prevSpeech) => ({ ...prevSpeech, text: audio[0].transcript }));

//         const tag = document.activeElement.nodeName;
//         if (tag === 'INPUT' || tag === 'TEXTAREA') {
//           if (audio.isFinal) {
//             document.activeElement.value += speech.text;
//           }
//         }
//         resultRef.current.innerText = speech.text;
//       });

//       toggleRef.current.addEventListener('click', () => {
//         setSpeech((prevSpeech) => ({
//           ...prevSpeech,
//           listening: !prevSpeech.listening,
//         }));

//         if (speech.listening) {
//           toggleRef.current.classList.add('listening');
//           toggleRef.current.innerText = 'Listening ...';
//           speech.recognition.start();
//         } else {
//           toggleRef.current.classList.remove('listening');
//           toggleRef.current.innerText = 'Toggle listening';
//           speech.recognition.stop();
//         }
//       });
//     }
//   }, [speech]);

//   return (
//     <form>
//       <fieldset>
//         <legend>Fill Out Form With Speech Recognition (Chrome)</legend>
//         <code ref={resultRef}>live transcript here ...</code>
//         <button ref={toggleRef} type="button" id="toggle">Toggle listening</button>
//         <p>Click on “Toggle listening”, then click on the form field, where you want to insert speeched text. Pause a bit after a sentence to process the speech-data. This demo only works with language <strong>“en-US”</strong>, only in Chrome, and only if you allow the microphone on this page!</p>
//         <label>Field  1<input /></label>
//         <label>Field  2<input /></label>
//         <label>Field  3<input /></label>
//         <label>Field  4<textarea></textarea></label>
//       </fieldset>
//     </form>
//   );
// };

// export default Officer;

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

const Officer = () => {
  
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
        } finally {
          qrCodeReader.reset();
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
  const [image, setImage] = useState({ preview: '', raw: '' });

  const handleChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });
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

      <div>
      <label htmlFor="upload-button">
        {image.preview ? <img src={image.preview} alt="preview" /> : (
          <>
            {/* You can replace the following with your custom upload icon */}
           <Button onClick={handleUpload}>Upload img</Button>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
    </div>
  );
};

export default Officer;