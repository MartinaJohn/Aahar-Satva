import React, { useState, useEffect } from 'react';
import { Input, QRCode, Space } from 'antd';

import contractaddress from "../artifacts/addresses/contract-address.json"
const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json')
const { ethers } = require("ethers");

const QRcode= ({id}) => {
    const [transactionHash, setTransactionHash] = useState(null);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractaddress, abi, signer);
    useEffect(() => {
        const fetchTransactionHash = async () => {
            const hash = await contract.getIdtoTxHash(id);
            setTransactionHash(hash);
        };

        fetchTransactionHash();
    }, [id]);
  
  return (
    <Space direction="vertical" align="center">
      <QRCode value={transactionHash || '-'} />
    </Space>
  );
};
export default QRcode;