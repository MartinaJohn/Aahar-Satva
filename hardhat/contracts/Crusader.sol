//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Crusader{
     struct Profile {
        string username;
        string password;
        string entity;
    }
    //all have prefix 'food'
    mapping(address => Profile) public manufacturers;
    mapping(address => Profile) public safetyofficers;
    mapping(address => Profile) public analysts;
    mapping(address=>Profile) public safetycommissioners;

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function registerManufacturer(
        string memory _username,
        string memory _password
    ) public {
        manufacturers[msg.sender] = Profile(_username, _password, "manufacturer");
    }
    
    function registerSafetyOfficer(
        string memory _username,
        string memory _password
    ) public {
        safetyofficers[msg.sender] = Profile(_username, _password, "safetyofficer");
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
        safetycommissioners[msg.sender] = Profile(_username, _password, "safetycommissioner");
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

    //ProductDetails[] public products;
    uint public totalProducts;
    mapping(uint => ProductDetails) public productsIdMapping;
    // mapping(address => Product[]) public bloodSamples;

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
    // require(_id == totalProducts, "ID must be equal to totalProducts");
    require(_ingredients.length == _quantity.length, "Ingredients and quantity arrays must have the same length");

     totalProducts++;
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

    //products.push(newProduct);
    productsIdMapping[_id] = newProduct;
}
    
    function getTotalProducts() public view returns(uint){
        return totalProducts;
    }
     function getProductById(uint _id) public view returns (ProductDetails memory) {
        return productsIdMapping[_id];
    }
}