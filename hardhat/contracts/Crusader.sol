//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Crusader {
    struct Profile {
        string username;
        string password;
        string entity;
    }
    //all have prefix 'food'
    mapping(address => Profile) public manufacturers;
    mapping(address => Profile) public safetyofficers;
    mapping(address => Profile) public analysts;
    mapping(address => Profile) public safetycommissioners;

    function registerManufacturer(
        string memory _username,
        string memory _password
    ) public {
        manufacturers[msg.sender] = Profile(
            _username,
            _password,
            "manufacturer"
        );
    }

    function registerSafetyOfficer(
        string memory _username,
        string memory _password
    ) public {
        safetyofficers[msg.sender] = Profile(
            _username,
            _password,
            "safetyofficer"
        );
    }

    function registerAnalyst(
        string memory _username,
        string memory _password
    ) public {
        analysts[msg.sender] = Profile(_username, _password, "analyst");
    }

    function registerCommissioner(
        string memory _username,
        string memory _password
    ) public {
        safetycommissioners[msg.sender] = Profile(
            _username,
            _password,
            "safetycommissioner"
        );
    }

    struct ProductDetails {
        uint id;
        string name;
        string[] ingredients;
        uint[] quantity;
        string intendedUse;
        string functionalUse;
        string manufacturingProcess;
        string nutritionalBenefits;
        uint fatPercentage;
        uint proteinPercentage;
        uint carbohydratePercentage;
    }

    // ProductDetails[] public products;
    // uint public totalProducts;
    mapping(address => ProductDetails[]) public foodProducts;
    mapping(uint => ProductDetails) public productsIdMapping;
    mapping(uint => bytes32) public idToTxHash; //for qrcode

    function addProduct(
        uint256 _id,
        string memory _name,
        string[] memory _ingredients,
        uint[] memory _quantity,
        string memory _intendedUse,
        string memory _functionalUse,
        string memory _manufacturingProcess,
        string memory _nutritionalBenefits,
        uint _fatPercentage,
        uint _proteinPercentage,
        uint _carbohydratePercentage
    ) public {
        ProductDetails memory newProduct = ProductDetails({
            id: _id,
            name: _name,
            ingredients: _ingredients,
            quantity: _quantity,
            intendedUse: _intendedUse,
            functionalUse: _functionalUse,
            manufacturingProcess: _manufacturingProcess,
            nutritionalBenefits: _nutritionalBenefits,
            fatPercentage: _fatPercentage,
            proteinPercentage: _proteinPercentage,
            carbohydratePercentage: _carbohydratePercentage
        });

        foodProducts[msg.sender].push(newProduct);
        productsIdMapping[_id] = newProduct;
        // Create a unique hash for the transaction
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, _id));

        idToTxHash[_id] = txHash;
    }

    function getAllProducts() public view returns (ProductDetails[] memory) {
        return foodProducts[msg.sender];
    }

    function getProductById(
        uint _id
    ) public view returns (ProductDetails memory) {
        return productsIdMapping[_id];
    }

    // qr code
    function getIdtoTxHash(uint _id) public view returns (bytes32) {
        return idToTxHash[_id];
    }
}
