import React from 'react';
import { Button } from 'antd';
import Nav from '../components/Nav';
import Service from '../components/Service';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
const Home = () => {
  return (
    <div className="bg-white">
      

      <section className="bg-cover bg-center bg-no-repeat h-screen mt-12" style={{ backgroundImage: "url('https://i.ibb.co/WkCw5gL/Untitled-design-8.png')" }}>
      <div className="container mx-auto pt-10 px-4 flex flex-col justify-start items-center h-full text-brown ">
        <h1 className="text-4xl font-bold mb-4 sm:text-5xl text-center">#Savor Safety, Taste Transparency</h1>
        <p className="text-lg mb-8 sm:text-xl text-center">Ensuring trust and confidence in the food we consume.</p>
        <Button type="font-bold shadow-lg border-black border-2 hover:bg-[#432818] hover:text-white shadow-lg " size="large"><Link to='/signup'>Join Us by Registering</Link></Button>
      </div>
    </section>
    <section className='ml-24 mr-24'>
    <Service/>
    </section>

      

    <section className="bg-[#FFF8EB] py-16 flex items-center">
      <div className="container mx-auto px-4 lg:flex lg:items-center">
        <div className="lg:w-1/3 lg:mr-16 ml-24">
          <img src="https://img.freepik.com/free-vector/mobile-marketing-concept-illustration_114360-1497.jpg?w=740&t=st=1708432765~exp=1708433365~hmac=9427f580f75f90ab36d0a9f5c54f592ad4e338ad21f56500ef788934298ffbe6" alt="Food Safety Awareness" className="rounded-lg shadow-lg"/>
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-8 text-[#432818]">Join Our Food Safety Awareness Campaign</h2>
          <p className="text-lg mb-8 text-[#432818]">Stay informed and contribute to food safety awareness. <br/>Get updates and valuable resources directly to your inbox!</p>
          <div className="flex">
            <Button type=" font-bold shadow-lg border-black border-2 hover:bg-[#432818] hover:text-white shadow-lg " size="large"><Link to='/viewforum'>Check Latest Updates Now</Link></Button>
          </div>
          <p className="mt-8 text-[#432818]">Use <span className="text-[#6f1d1b] font-bold">#FoodSafetyFirst</span> to spread the word!</p>
        </div>
      </div>
    </section>
    <section className="bg-[#FFFFFF] py-16 flex items-center">
  <div className="container mx-auto px-4 lg:flex lg:items-center mr-20 ml-20">
    <div className="lg:w-1/2 ">
    <div className="flex justify-start">
          <p className="text-sm font-semibold text-[#99582a]">EMBARK ON YOUR</p>
        </div>
        <h1 className="text-3xl mb-2 font-bold text-[#432818] tracking-tight text-start">Food Product Compliance Journey</h1>
        
      
      <p className="text-lg mb-8 text-[#432818]">Navigate the complexities of food product compliance with ease to ensure your food products meet all regulatory requirements.</p>
      <div className="flex">
        <Button type="Link" className="font-bold shadow-lg border-black border-2 hover:bg-[#432818] hover:text-white shadow-lg " size="large">Track Now</Button>
      </div>
      <p className="mt-8 text-[#432818]">Join us in promoting food safety with <span className="text-[#6f1d1b] font-bold">#ComplianceQuest</span>!</p>
    </div>
    <div className="lg:w-2/4 lg:ml-16 ml-24">
      <img src="https://img.freepik.com/free-vector/dietology-nutritionist-dietitian-infographics-with-round-nutrition-element-images-raw-food-outline-icons-editable-text-vector-illustration_1284-80704.jpg?t=st=1708434582~exp=1708438182~hmac=38a691544eb86708c6cb2fcca675ac77b1484ab7b59453f0888e8789f801b3f6&w=1060" alt="Food Compliance Journey" className="rounded-lg shadow-lg"/>
    </div>
  </div>
</section>



    </div>
  );
};

export default Home;
