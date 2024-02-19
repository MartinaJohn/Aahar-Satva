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

    
    function authenticate(
        address _address,
        string memory _username,
        string memory _password
    ) public view returns (bool) {
        Profile memory manufacturer = manufacturers[_address];
        Profile memory safetycommissioner = safetycommissioners[_address];
        Profile memory safetyofficer=safetyofficers[_address];
        Profile memory analyst=analysts[_address];


        if (
            keccak256(abi.encodePacked(manufacturer.entity)) ==
            keccak256(abi.encodePacked("manufacturer")) &&
            keccak256(abi.encodePacked(manufacturer.username)) ==
            keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(manufacturer.password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            return true;
        }

         if (
            keccak256(abi.encodePacked(safetycommissioner.entity)) ==
            keccak256(abi.encodePacked("safetycommissioner")) &&
            keccak256(abi.encodePacked(safetycommissioner.username)) ==
            keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(safetycommissioner.password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            return true;
        }

        if (
            keccak256(abi.encodePacked(analyst.entity)) ==
            keccak256(abi.encodePacked("analyst")) &&
            keccak256(abi.encodePacked(analyst.username)) ==
            keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(analyst.password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            return true;
        }
        
        if(
            keccak256(abi.encodePacked(safetyofficer.entity)) ==
            keccak256(abi.encodePacked("safetyofficer")) &&
            keccak256(abi.encodePacked(safetyofficer.username)) ==
            keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(safetyofficer.password)) ==
            keccak256(abi.encodePacked(_password))
        ){
            return true;
        }
        return false;
    }
}