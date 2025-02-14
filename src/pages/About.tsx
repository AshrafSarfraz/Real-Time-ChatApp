import React from 'react';

const About = () => {
  return (
    <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">About ChatConnect</h1>
      
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">Connecting People Globally</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            ChatConnect is a revolutionary messaging platform that brings people together across borders. 
            Founded in 2023, we've grown from a small startup to serving millions of users worldwide.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make communication seamless, secure, and enjoyable for everyone, 
            whether you're connecting with family, friends, or colleagues.
          </p>
        </div>
        <div className="bg-orange-100 p-8 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-600 mb-4">Key Features</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
              Real-time messaging with end-to-end encryption
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
              Voice and video calls
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
              File sharing and collaboration tools
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
              Cross-platform compatibility
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-semibold text-orange-600 mb-6">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Privacy First</h3>
            <p className="text-gray-600">
              We believe in protecting your privacy with state-of-the-art security measures.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
            <p className="text-gray-600">
              Constantly evolving our platform with cutting-edge technology.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Community</h3>
            <p className="text-gray-600">
              Building meaningful connections and fostering global communities.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-2xl font-semibold text-orange-600 mb-6">Our Numbers</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold text-gray-800 mb-2">10M+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-800 mb-2">150+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-800 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-800 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 