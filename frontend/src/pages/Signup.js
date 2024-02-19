import React, { useState } from "react";
import { Link } from "react-router-dom";

import contractaddress from "../artifacts/addresses/contract-address.json"
import { Form, Input, Button, Card, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import Navbar from "../components/Navbar"
const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi
const { ethers } = require("ethers");
const { Option } = Select;

const Signup = () => {
  const [registered, setRegistered] = useState(false);

  const [form] = Form.useForm(); // Create a form instance
  const contractAddress = contractaddress
    console.log(contractAddress)
    const contractABI=abi
    console.log(abi)
  const handleSignup = async (values) => {
    try {
      if (typeof window.ethereum === 'undefined') {
        // MetaMask is not installed or not accessible
        alert("Please install and unlock MetaMask to use this application.");
        return;
      }

      // Connect to the MetaMask provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider)
      // Request account access from the user
      await provider.send("eth_requestAccounts", []);

      // Get the signer
      const signer = provider.getSigner();
      console.log(signer)
      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      if (values.role === "manufacturer") {
        await contract.registerManufacturer(values.email, values.password);
      } 
      else if (values.role === "safetyofficer") {
        await contract.registerSafetyOfficer(values.email, values.password);
      }
      else if(values.role==="analyst"){
        await contract.registerAnalyst(values.email,values.password)
      } 
      else if(values.role==="safetycommissioner"){
        await contract.registerCommissioner(values.email,values.password)
      }
      else {
        alert("Invalid role");
        return;
      }

      setRegistered(true);
	  alert("success")
    } catch (error) {
      console.error(error);
      alert("An error occurred during signup");
    }
  };

  const handleReset = () => {
    form.resetFields();
    setRegistered(false);
  };

  return (
    <div>
      {/* <Navbar/> */}
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
      <Card style={{ width: 400, padding: 20, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.25)" }}>
        {registered ? (
          <div>
            <h2>Registration Successful!</h2>
            <p>
              Please proceed to the <Link to="/signin">Signin Page</Link> to log in.
            </p>
            <Button type="primary" onClick={handleReset}>
              Register Another User
            </Button>
          </div>
        ) : (
          <div>
            <h2 style={{ textAlign: "center" }}>User Signup</h2>
            <Form form={form} onFinish={handleSignup}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select placeholder="Select Role">
                  <Option value="manufacturer">Food manufacturer</Option>
                  <Option value="analyst">Food Analyst</Option>
                  <Option value="safetyofficer">Food Safety Officer</Option>
                  <Option value="safetycommissioner">Food Safety commissioner</Option>


                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%", fontSize: "15px"}}>
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Card>
    </div>
    </div>
  );
};

export default Signup;