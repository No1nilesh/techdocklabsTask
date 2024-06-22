"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profileData"));
    setProfileData(data);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center">Profile</h1>
      </header>
      <div className="flex flex-col items-center gap-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden shadow-lg">
          {profileData.image ? (
            <Image
              src={profileData.image}
              height={128}
              width={128}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-2xl text-gray-400">No Image</span>
            </div>
          )}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {profileData.fname} {profileData.lname}
          </h2>
          <p className="text-gray-600 mt-2">{profileData.bio}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8 bg-gray-50 p-4 rounded-lg shadow-inner">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-700">Gender:</span>
          <span>{profileData.gender}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-700">Mobile:</span>
          <span>{profileData.mobile}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-700">Date of Birth:</span>
          <span>
            {profileData.month} {profileData.date}, {profileData.year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
