
const fs = require('fs');
const path = require('path');
const { ethers } = require("hardhat");
async function main() {
  const Crusader = await ethers.getContractFactory("Crusader");
  const crus = await Crusader.deploy();
  const contractAddress = await crus.getAddress()

  console.log("Deployed address:", contractAddress);
  const contractAddressJSON = JSON.stringify(contractAddress, null, 2);
  fs.writeFileSync(path.join(__dirname, '../../frontend/src/artifacts/addresses/contract-address.json'), contractAddressJSON);
 }

 main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
