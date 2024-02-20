import React, { useEffect, useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import { ethers } from 'ethers';

// Replace with your deployed contract's address and ABI
const contractAddress = '0xYourContractAddress';
const contractABI = [
  // Your contract's ABI goes here
];

// Replace with your Ethereum provider URL
const providerUrl = 'http://localhost:8545';

const Flowdiag = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Connect to the Ethereum network
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);

      // Connect to the smart contract
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      // Fetch data from the smart contract
      // This assumes your contract has a function `getItemCount` that returns the number of items
      // and a function `getItem` that takes an index and returns the details of the item at that index
      const itemCount = await contract.getItemCount();

      let newElements = [];
      for (let i =  0; i < itemCount; i++) {
        const item = await contract.getItem(i);

        // Add a node for each item
        newElements.push({
          id: `item-${i}`,
          data: { label: item.status },
          position: { x: i *  150, y:  50 },
        });

        // Add an edge from the previous item to the current item
        if (i >  0) {
          newElements.push({
            id: `edge-${i}`,
            source: `item-${i -  1}`,
            target: `item-${i}`,
            animated: true,
          });
        }
      }

      setElements(newElements);
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow elements={elements} />
    </div>
  );
};

export default Flowdiag;
