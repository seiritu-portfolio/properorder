import React from "react";

export default function busIcon(color) {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M15.6097 2.5H0.975594V13.3333H15.6097V2.5Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.6097 6.6665H19.5122L22.439 9.1665V13.3332H15.6097V6.6665Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.36585 17.5002C6.71289 17.5002 7.80488 16.5674 7.80488 15.4168C7.80488 14.2662 6.71289 13.3335 5.36585 13.3335C4.01881 13.3335 2.92683 14.2662 2.92683 15.4168C2.92683 16.5674 4.01881 17.5002 5.36585 17.5002Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.0488 17.5002C19.3958 17.5002 20.4878 16.5674 20.4878 15.4168C20.4878 14.2662 19.3958 13.3335 18.0488 13.3335C16.7017 13.3335 15.6097 14.2662 15.6097 15.4168C15.6097 16.5674 16.7017 17.5002 18.0488 17.5002Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="23.4146" height="20" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}
