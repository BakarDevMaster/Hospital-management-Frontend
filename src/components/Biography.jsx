// eslint-disable-next-line no-unused-vars
import React from 'react';

const Biography = () => {
  return (
    <div className="sm:flex items-center max-w-screen-xl mx-auto my-16 px-4 sm:px-0">
      {/* Left Column */}
      <div className="sm:w-1/2">
        <div className="image object-center text-center">
          <img src="hospital.jpg" alt="Hospital" className="rounded-lg shadow-md" />
        </div>
      </div>
      {/* Right Column */}
      <div className="sm:w-1/2 mt-6 sm:mt-0 sm:pl-12">
        <div className="text">
          <span className="text-gray-800 border-b-2 border-cyan-600 uppercase">
            Biography
          </span>
          <h2 className="my-4 font-bold text-3xl sm:text-4xl">
            About <span className="text-cyan-600">Our Hospital</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our team of experts combines deep industry knowledge with cutting-edge technology to develop solutions that meet the unique challenges of modern healthcare. We understand the complexities of hospital administration and strive to simplify processes, reduce wait times, and ensure the highest standards of care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Biography;
