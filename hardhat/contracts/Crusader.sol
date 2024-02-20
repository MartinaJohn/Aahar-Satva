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
        ApprovalStatus foodAnalystApproval;
        ApprovalStatus fscApproval;
    }

    // ProductDetails[] public products;
    // uint public totalProducts;

    mapping(address => ProductDetails[]) public foodProducts;
    mapping(uint => ProductDetails) public productsIdMapping;
    mapping(uint => bytes32) public idToTxHash; //for qrcode
    mapping(bytes32 => uint) public txHashToProductId;

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
<<<<<<< HEAD

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
        return product;
    }
}
=======
     mapping(address => string) public manufacturerAadhar;
    function setManufacturerAadhar(string memory _url) public {
    // Check if the sender is a registered manufacturer
    require(bytes(manufacturers[msg.sender].username).length >  0, "Not a registered manufacturer");

    // Set the URL for the manufacturer
    manufacturerAadhar[msg.sender] = _url;
    }
    mapping(address=>string)public manufacturerReports;
    function setManufacturerReport(string memory _url) public{
        require(bytes(manufacturers[msg.sender].username).length>0,"Not a registered manufacturer");
        manufacturerReports[msg.sender]=_url;
    }
}
>>>>>>> 370368741c048630173d816698a40b9886d208db
