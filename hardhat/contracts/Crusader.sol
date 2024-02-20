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

    mapping(address => string) private roleMapping;

    function registerManufacturer(
        string memory _username,
        string memory _password
    ) public {
        manufacturers[msg.sender] = Profile(
            _username,
            _password,
            "manufacturer"
        );
        roleMapping[msg.sender] = "manufacturer";
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
        roleMapping[msg.sender] = "safetyofficer";
    }

    function registerAnalyst(
        string memory _username,
        string memory _password
    ) public {
        analysts[msg.sender] = Profile(_username, _password, "analyst");
        roleMapping[msg.sender] = "analyst";
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
        roleMapping[msg.sender] = "safetycommissioner";
    }

    enum ApprovalStatus {
        Pending,
        Approved,
        Rejected
    }
    mapping(uint => address) public foodSafetyOfficerApprovers;
    mapping(uint => uint) public foodSafetyOfficerApprovalTimestamps;
    mapping(uint => address) public foodAnalystApprovers;
    mapping(uint => uint) public foodAnalystApprovalTimestamps;
    mapping(uint => address) public foodSafetyComissionerApprovers;
    mapping(uint => uint) public foodSafetyComissionerTimestamps;


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
        ApprovalStatus foodSafetyOfficerApproval;
        // uint foodSafetyOfficerApprovalTimestamp;
        // address foodSafetyOfficerApprover;
        ApprovalStatus foodAnalystApproval;
        // uint foodAnalystApprovalTimestamp;
        // address foodAnalystApprover;
        ApprovalStatus fscApproval;
        // uint fscApprovalTimestamp;
        // address fscApprover;
    }

    // ProductDetails[] public products;
    // uint public totalProducts;

    mapping(address => ProductDetails[]) public foodProducts;
    mapping(uint => ProductDetails) public productsIdMapping;
    mapping(uint => bytes32) public idToTxHash; //for qrcode
    mapping(bytes32 => uint) public txHashToProductId;

    

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
            carbohydratePercentage: _carbohydratePercentage,
            foodSafetyOfficerApproval: ApprovalStatus.Pending,
            foodAnalystApproval: ApprovalStatus.Pending,
            fscApproval: ApprovalStatus.Pending
        });

        foodProducts[msg.sender].push(newProduct);
        productsIdMapping[_id] = newProduct;
        // Create a unique hash for the transaction
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, _id));

        idToTxHash[_id] = txHash;
        txHashToProductId[txHash] = _id;
    }


    // Function to approve the product by the food safety officer
    function approveProductByFoodSafetyOfficer(
        bytes32 _txHash
    ) public returns (ProductDetails memory) {
        uint productId = txHashToProductId[_txHash];
        ProductDetails storage product = productsIdMapping[productId];
        require(
            keccak256(abi.encodePacked(roleMapping[msg.sender])) ==
                keccak256(abi.encodePacked("safetyofficer")),
            "Only food safety officer can approve"
        );
        require(
            product.foodSafetyOfficerApproval == ApprovalStatus.Pending,
            "Product already approved or rejected by food safety officer"
        );
        product.foodSafetyOfficerApproval = ApprovalStatus.Approved;
        foodSafetyOfficerApprovers[productId] = msg.sender;
        foodSafetyOfficerApprovalTimestamps[productId] = block.timestamp;
        return product;
    }
   



    // Function to approve the product by the food analyst
    function approveProductByFoodAnalyst(
        bytes32 _txHash
    ) public returns (ProductDetails memory) {
        uint productId = txHashToProductId[_txHash];
        ProductDetails storage product = productsIdMapping[productId];
        require(
            keccak256(abi.encodePacked(roleMapping[msg.sender])) ==
                keccak256(abi.encodePacked("analyst")),
            "Only analyst can approve"
        );
        require(
            product.foodAnalystApproval == ApprovalStatus.Pending,
            "Product already approved or rejected by food analyst"
        );
        product.foodAnalystApproval = ApprovalStatus.Approved;
        foodAnalystApprovers[productId] = msg.sender;
        foodAnalystApprovalTimestamps[productId] = block.timestamp;
        return product;
    }
   
    function approveProductByFSC(
        bytes32 _txHash
    ) public returns (ProductDetails memory) {
        uint productId = txHashToProductId[_txHash];
        ProductDetails storage product = productsIdMapping[productId];
        require(
            keccak256(abi.encodePacked(roleMapping[msg.sender])) ==
                keccak256(abi.encodePacked("safetycommissioner")),
            "Only manufacturers can approve"
        );
        require(
            product.fscApproval == ApprovalStatus.Pending,
            "Product already approved or rejected by manufacturer"
        );
        product.fscApproval = ApprovalStatus.Approved;
        foodSafetyComissionerApprovers[productId] = msg.sender;
        foodSafetyComissionerTimestamps[productId] = block.timestamp;
        return product;
    }
    
    function getFoodSafetyOfficerApprover(uint _productId) public view returns (address) {
        return foodSafetyOfficerApprovers[_productId];
    }

    function getFoodSafetyOfficerApprovalTimestamp(uint _productId) public view returns (uint) {
        return foodSafetyOfficerApprovalTimestamps[_productId];
    }

    // Getter functions for foodAnalystApprovers
    function getFoodAnalystApprover(uint _productId) public view returns (address) {
        return foodAnalystApprovers[_productId];
    }

    function getFoodAnalystApprovalTimestamp(uint _productId) public view returns (uint) {
        return foodAnalystApprovalTimestamps[_productId];
    }

    // Getter functions for foodSafetyComissionerApprovers
    function getFoodSafetyComissionerApprover(uint _productId) public view returns (address) {
        return foodSafetyComissionerApprovers[_productId];
    }

    function getFoodSafetyComissionerApprovalTimestamp(uint _productId) public view returns (uint) {
        return foodSafetyComissionerTimestamps[_productId];
    }
}