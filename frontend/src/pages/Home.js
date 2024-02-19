import React from 'react';
import { Button } from 'antd';

const Home = () => {
  return (
    <div className="bg-gray-100">
    
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold">FoodSafety</div>
            <ul className="flex space-x-6">
              <li className="text-gray-700 hover:text-gray-900">
                <a href="#">Home</a>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                <a href="#">About</a>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                <a href="#">Services</a>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                <a href="#">Blog</a>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 sm:text-5xl">Empowering Food Safety & Transparency</h1>
          <p className="text-lg mb-8 sm:text-xl">Ensuring trust and confidence in the food we consume.</p>
          <Button type="primary" size="large">Get Started</Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Food Regulations</h3>
              <p>Stay informed about the latest food regulations and compliance standards.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Safety Standards</h3>
              <p>Discover safety standards and best practices to ensure food safety.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Community Forum</h3>
              <p>Join our community forum to discuss food safety issues and share insights.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Education Resources</h3>
              <p>Access educational resources and training materials on food safety.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Join Our Forum</h2>
          <p className="text-lg mb-8">Connect with experts and enthusiasts in the food safety community.</p>
          <div className="flex justify-center">
            <Button type="primary" size="large">Join Now</Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-4 sm:mb-0">FoodSafety</div>
            <ul className="flex space-x-6">
              <li>About</li>
              <li>Services</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <p className="mt-4 text-center sm:text-left">&copy; 2024 FoodSafety. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
