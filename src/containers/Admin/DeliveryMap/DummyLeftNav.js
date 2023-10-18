import React from "react";

export default function DummyLeftNav() {
  return (
    <div className="text-left font-bold bg-blue-700 w-48 text-blue-100 px-2">
      <a href="" className="text-white flex items-center space-x-1 py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <span className="text-xl font-extrabold">Proper Order</span>
      </a>
      <nav>
        <a
          className="block py-2.5 px-4 hover:bg-blue-600 hover:text-white rounded"
          href="#"
        >
          Home
        </a>
        <a
          className="block py-2.5 px-4 hover:bg-blue-600 hover:text-white rounded"
          href="#"
        >
          Orders
        </a>
        <a
          className="block py-2.5 px-4 hover:bg-blue-600 hover:text-white rounded"
          href="#"
        >
          Settings
        </a>
        <a
          className="block py-2.5 px-4 hover:bg-blue-600 hover:text-white rounded"
          href="#"
        >
          Delivery Areas
        </a>
      </nav>
    </div>
  );
}
