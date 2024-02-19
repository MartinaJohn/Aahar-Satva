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



import React,{useState} from 'react'

function Login() {
 
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
    <div className="flex justify-center items-center mt-20 mb-20">
      <div className="grid grid-cols-2 max-w-3xl p-2 shadow-2xl rounded-2xl">
        <div>
          {/* <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?size=626&ext=jpg&ga=GA1.1.900017827.1707918895&semt=sph"
            alt="Image"
            className="object-cover rounded-lg w-full h-full"
          alt="w"/> */}
        </div>
        <div>
          <div className="card bg-base-100 p-6">
            <h2 className="text-2xl font-bold">Login Here</h2>
            <hr className="my-4 border-t-2 border-base-200" />
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  required
                  type="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Password</label>
                <input
                  required
                                    type="password"
                  className="input input-bordered"
                />
              </div>
              <div className="mt-6 form-control">
                <button type="submit"
                  className="bg-base-100 border-[#0000ff] btn w-full hover:bg-[#0000ff] hover:text-white"
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
  
};

export default Login;
