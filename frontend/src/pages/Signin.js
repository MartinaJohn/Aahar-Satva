import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import abi from "../artifacts/contracts/RaktEase.sol/RaktEase.json"
import contractaddress from "../artifacts/addresses/contract-address.json"
import { Form, Input, Button, Card, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import Navbar from "../components/Navbar";
const { ethers } = require("ethers");
const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi
const Signin = () => {
	const [form] = Form.useForm();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const navigate = useNavigate();


const contractAddress=contractaddress
const contractABI=abi
	const handleLogin = async (values) => {
		try {
		  if (typeof window.ethereum === 'undefined') {
			alert("Please install and unlock MetaMask to use this application.");
			return;
		  }

		  const provider = new ethers.providers.Web3Provider(window.ethereum);
		  await provider.send("eth_requestAccounts", []);
		  const signer = provider.getSigner();
		  const address = await signer.getAddress();
		  console.log(address)
		  const contract = new ethers.Contract(contractAddress, contractABI, signer);

		  let manufacturer, analyst,safetyofficer,safetycommissioner;
		  try {
        console.log('working')
			manufacturer = await contract.manufacturers(address);
        console.log(manufacturer.username)
		  } catch (error) 
      {
 		console.error("Error calling researchers function: ", error);
		  }
		  try {
        console.log('working')

			analyst = await contract.analysts(address);
            console.log(analyst.username)
		  } catch (error) {
			console.error("Error calling funders function: ", error);
		  }
          try{
            safetyofficer=await contract.safetyofficers(address)
            console.log(safetyofficer.username)
          }
          
          catch(error){
			console.error("Error calling funders function: ", error);

          }
          try{
            safetycommissioner=await contract.safetycommissioners(address)
          }
          catch(error){
            console.error("Error calling funders function: ",error)
          }

      console.log('form ',email)
      console.log('contract',manufacturer.username)
		  if (manufacturer.username === values.email && manufacturer.password === values.password) {
      console.log('form ',email)
      console.log('contract',manufacturer.email)
			setRole("manufacturer");
			  navigate("/manufacturer");
		  } else if (analyst && analyst.username === values.email && analyst.password === values.password) {
			setRole("analyst");
			  navigate("/analyst");
		  }
         
          else if(safetycommissioner && safetycommissioner.username===values.email && safetycommissioner.password===values.password){
            setRole("safetycommissioner")
            navigate("/safetycommissioner")
          }
          else if(safetyofficer && safetyofficer.username===values.email && safetyofficer.password===values.password){
            setRole("safetyofficer")
            navigate("/safetyofficer")
          }
           else {
			alert("Invalid email or password");
		  }
		} catch (error) {
		  console.error(error);
		  alert("An error occurred during login");
		}
	  };

	return (
		<div>
		{/* <Navbar/> */}
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
		<Card style={{ width: 400, padding: 20, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
		  <h2 style={{ textAlign: "center" }}>User Login</h2>
		  <Form form={form} onFinish={handleLogin}>
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
			<Form.Item>
			  <Button type="primary" htmlType="submit" style={{ width: "100%", fontSize: "15px" }}>
				Login
			  </Button>
			</Form.Item>
		  </Form>
		</Card>
	  </div>
	  </div>
	);
  };

  export default Signin;