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

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

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
}
