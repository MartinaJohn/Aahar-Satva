// // ProductTimelinePage.js
// import React, { useState, useEffect } from 'react';
// import { Timeline, Card } from 'antd';
// import { useParams } from 'react-router-dom'; // Import useParams
// import { ethers } from 'ethers';
// import abi from "../artifacts/contracts/Crusader.sol/Crusader.json";
// import contractaddress from "../artifacts/addresses/contract-address.json";

// const FullProductTimeline = () => {
//     const { id } = useParams(); // Get the product ID from the URL
//     const [product, setProduct] = useState(null);
//     const [approvals, setApprovals] = useState([]);

//     useEffect(() => {
//         const fetchProductTimeline = async () => {
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             await provider.send("eth_requestAccounts", []);
//             const signer = provider.getSigner();
//             const contractABI = abi.abi;
//             const contract = new ethers.Contract(contractaddress, contractABI, signer);

//             // Fetch product details
//             const product = await contract.getProductById(id);
//             setProduct(product);

//             // Fetch approval information
//             const approvals = [
//                 {
//                     role: 'Food Safety Officer',
//                     approver: await contract.getFoodSafetyOfficerApprover(id),
//                     timestamp: await contract.getFoodSafetyOfficerApprovalTimestamp(id)
//                 },
//                 {
//                     role: 'Food Analyst',
//                     approver: await contract.getFoodAnalystApprover(id),
//                     timestamp: await contract.getFoodAnalystApprovalTimestamp(id)
//                 },
//                 {
//                     role: 'Food Safety Commissioner',
//                     approver: await contract.getFoodSafetyComissionerApprover(id),
//                     timestamp: await contract.getFoodSafetyComissionerApprovalTimestamp(id)
//                 }
//             ];
//             setApprovals(approvals);
//         };

//         fetchProductTimeline();
//     }, [id]); // Use the product ID from useParams as a dependency

//     const formatTime = (timestamp) => {
//         const date = new Date(timestamp *  1000); // Convert to milliseconds
//         return date.toLocaleTimeString('en-US'); // Format to "hh:mm AM/PM"
//     };

//     return (
//         <Card title="Product Approval Timeline" style={{ width: '100%', marginTop: '20px' }}>
//             <Timeline>
//                 {approvals.map((approval, index) => (
//                     <Timeline.Item key={index}>
//                         <p><b>{approval.role} Approval: </b>{approval.approver===0 ? 'Pending': 'Approved'}</p>
//                         <p><b>Timestamp: </b>{approval.timestamp ? formatTime(approval.timestamp) : 'N/A'}</p>
//                         <p><b>Address: </b>{approval.approver || 'N/A'}</p>
//                     </Timeline.Item>
//                 ))}
//             </Timeline>
//         </Card>
//     );
// };

// export default FullProductTimeline;
// // import React from 'react'

// // const FullProductTimeline = () => {
// //   return (
// //     <div>FullProductTimeline</div>
// //   )
// // }

// // export default FullProductTimeline

// ProductTimelinePage.js
import React, { useState, useEffect } from 'react';
import { Timeline, Card } from 'antd';
import { useParams } from 'react-router-dom'; // Import useParams
import { ethers } from 'ethers';
import abi from "../artifacts/contracts/Crusader.sol/Crusader.json";
import contractaddress from "../artifacts/addresses/contract-address.json";

const FullProductTimeline = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [approvals, setApprovals] = useState([]);

    useEffect(() => {
        const fetchProductTimeline = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contractABI = abi.abi;
            const contract = new ethers.Contract(contractaddress, contractABI, signer);

            // Fetch product details
            const product = await contract.getProductById(id);
            setProduct(product);

            // Fetch approval information
            const approvals = [
                {
                    role: 'Food Safety Officer',
                    approver: await contract.getFoodSafetyOfficerApprover(id),
                    timestamp: await contract.getFoodSafetyOfficerApprovalTimestamp(id)
                },
                {
                    role: 'Food Analyst',
                    approver: await contract.getFoodAnalystApprover(id),
                    timestamp: await contract.getFoodAnalystApprovalTimestamp(id)
                },
                {
                    role: 'Food Safety Commissioner',
                    approver: await contract.getFoodSafetyComissionerApprover(id),
                    timestamp: await contract.getFoodSafetyComissionerApprovalTimestamp(id)
                }
            ];
            setApprovals(approvals);
        };

        fetchProductTimeline();
    }, [id]); // Use the product ID from useParams as a dependency

    const formatTime = (timestamp) => {
        const date = new Date(timestamp *   1000); // Convert to milliseconds
        return date.toLocaleTimeString('en-US'); // Format to "hh:mm AM/PM"
    };

    return (
        <Card title="Product Approval Timeline" style={{ width: '100%', marginTop: '20px' }}>
            <Timeline>
                {approvals.map((approval, index) => (
                    <Timeline.Item key={index}>
                        <p><b>{approval.role} Approval: </b>{approval.approver === ethers.constants.AddressZero ? 'Pending' : 'Approved'}</p>
                        <p><b>Timestamp: </b>{approval.timestamp ? formatTime(approval.timestamp) : 'N/A'}</p>
                        <p><b>Address: </b>{approval.approver || 'N/A'}</p>
                    </Timeline.Item>
                ))}
            </Timeline>
        </Card>
    );
};

export default FullProductTimeline;
