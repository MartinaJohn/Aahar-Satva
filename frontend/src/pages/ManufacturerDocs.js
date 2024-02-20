// import React from 'react'
// import { Form, Input, Button, message } from 'antd';
// import { Web3Storage } from "web3.storage";
// const ManufacturerDocs = () => {
//   const[form]=Form.useForm()
//   // IPFS
//         const apiToken =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzQjE2NEJjMzM3MTFBMmQyQTEyYzIwYkE2MjA3YjIzQWExQTY0NzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzg4OTM2MDg0MzEsIm5hbWUiOiJpcGZzX2RvY3MifQ.wXK5hTOg_J3rgNGKf5Rw0D6keTv7KjfJq1ZbsTpTxyQ";
//         const url = "";
//         const client = new Web3Storage({ token: apiToken });
//         let file;
//         const handleUpload = async () => {
//         console.log(document.getElementById("input").files[0]);
//         var fileInput = document.getElementById("input");
//         const rootCid = await client.put(fileInput.files, {
//         name: "user documents",
//         maxRetries: 3,
//         });
//         console.log(rootCid);
//         // const res = await client.get(rootCid);
//         // const files = await res.files();
//         // url = URL.createObjectURL(files[0]);
//         file = rootCid;
//         // console.log(typeof file, file);
//         };


//   const onFinish=async(values)=>{

//   }
//   return (
//     <div>
//       <Form form={form} onFinish={onFinish()}>
//       <section>
//             <div>
//               <label for="file">Choose the file to upload</label>
//               <input type="file" id="input" name="file" multiple />
//             </div>
//             <Button onClick={handleUpload}>Upload document</Button>
//           </section>
//       </Form>
//     </div>
//   )
// }

// export default ManufacturerDocs
