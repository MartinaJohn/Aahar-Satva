// import React,{ useState } from 'react'

// function Login() {
//    // State to hold form data
//    const [email, setEmail] = useState('');
//    const [password, setPassword] = useState('');
 
//    // Dummy handleLogin function
//    const handleLogin = (event) => {
//      event.preventDefault(); // Prevent the default form submission

//      console.log('Logging in with email:', email);
//      console.log('Logging in with password:', password);

//      setEmail('');
//      setPassword('');
//    };
 

//   return (
//     <div className="flex justify-center items-center mt-20 mb-20">
//       <div className="grid grid-cols-2 max-w-3xl p-2 shadow-2xl rounded-2xl">
//         <div>
//           <img
//             src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?size=626&ext=jpg&ga=GA1.1.900017827.1707918895&semt=sph"
//             alt=""
//             className="object-cover rounded-lg w-full h-full"
//           />
//         </div>
//         <div>
//           <div className="card bg-base-100 p-6">
//             <h2 className="text-2xl font-bold">Login Here</h2>
//             <hr className="my-4 border-t-2 border-base-200" />
//             <form onSubmit={handleLogin}>
//               <div className="form-control">
//                 <label className="label">Email</label>
//                 <input
//                   required
//                   type="email"
//                   className="input input-bordered"
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">Password</label>
//                 <input
//                   required
//                  type="password"
//                   className="input input-bordered"
//                 />
//               </div>
//               <div className="mt-6 form-control">
//                 <button
//                   type="submit"
//                   className="bg-base-100 border-[#0000ff] btn w-full hover:bg-[#0000ff] hover:text-white"
//                 >
//                   Login
//                 </button>
//               </div>
//               <div className="mt-4 text-center">
//                 <p className="text-base">
//                   Don't have an account?{' '}
//                   <a href={'/Signup'} className="text-[#0000ff] font-bold">
//                     Sign Up
//                   </a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default Login;

import React, { useState } from 'react';

function Login() {
  // State to hold form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Dummy handleLogin function
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission

    console.log('Logging in with email:', email);
    console.log('Logging in with password:', password);

    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-2 max-w-3xl p-6 bg-white shadow-2xl rounded-2xl">
        <div>
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?size=626&ext=jpg&ga=GA1.1.900017827.1707918895&semt=sph"
            alt="Privacy policy concept illustration"
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Login Here</h2>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label htmlFor="email" className="label">Email</label>
                <input
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">Password</label>
                <input
                  id="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="form-control">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-base">
                  Don't have an account?{' '}
                  <a href={'/Signup'} className="text-[#0000ff] font-bold">
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
