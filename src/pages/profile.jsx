import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { userdata } = useSelector((store) => store.userReducer);

  return (
    <div className="max-w-4xl mx-auto p-5  text-gray-200 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-semibold mb-5 text-center text-gray-800">Welcome, {userdata.name}</h1>
      
      <div className="text-center">
        <div>
          <p className="text-gray-400"><span className="font-medium text-gray-700">Email: </span>{userdata.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
