import React from "react";
import logo from "/public/logo.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <img src={logo} alt="AKH Transport Logo" className="w-64 mb-8" />
      <h1 className="text-4xl font-bold text-blue-700">Vitajte v AKH Transport</h1>
      <p className="mt-4 text-gray-600">Moderná prepravná služba s Firebase backendom</p>
    </div>
  );
}
