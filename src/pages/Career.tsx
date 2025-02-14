import React from 'react';

const Career = () => {
  const openPositions = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'New York, USA',
      type: 'Full-time',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'London, UK',
      type: 'Full-time',
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
  ];

  return (
    <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Join Our Team</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Be part of something special. We're on a mission to transform how people connect and communicate globally.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-600 mb-3">Innovation First</h3>
          <p className="text-gray-600">
            Work with cutting-edge technology and shape the future of communication.
          </p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-600 mb-3">Work-Life Balance</h3>
          <p className="text-gray-600">
            Flexible working hours, remote options, and competitive time off.
          </p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-600 mb-3">Growth & Learning</h3>
          <p className="text-gray-600">
            Continuous learning opportunities and career development support.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Benefits & Perks</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {['Health Insurance', 'Stock Options', 'Remote Work', 'Learning Budget', 
            'Paid Time Off', 'Home Office Setup', 'Team Events', 'Wellness Programs'].map((benefit) => (
            <div key={benefit} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-700 font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Open Positions</h2>
        <div className="space-y-4">
          {openPositions.map((position) => (
            <div 
              key={position.title}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-orange-600 mb-2">{position.title}</h3>
                  <p className="text-gray-600 mb-4">{position.department} · {position.location} · {position.type}</p>
                  <button className="text-orange-600 hover:text-orange-700 font-medium">
                    Learn More →
                  </button>
                </div>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career; 