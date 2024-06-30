'use client'
import Pricing from "@/components/pricing";
import YourComponent from "@/components/test";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-10">
        Welcome to Our Service
      </h1>
      <Pricing />
      {/* <YourComponent /> */}
    </div>
  );
};

export default HomePage;
