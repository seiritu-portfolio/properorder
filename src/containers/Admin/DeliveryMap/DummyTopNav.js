import React from "react";

export default function DummyTopNav() {
  return (
    <div className="flex bg-blue-700 text-white font-bold">
      <div className="flex flex-1 h-12 justify-center pt-3" />
      <div className="flex h-12 w-36 pt-3 cursor-pointer">
        My Profile
        <img
          className="inline object-cover w-7 h-7 mx-2 rounded-full"
          src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Profile image"
        />
      </div>
    </div>
  );
}
