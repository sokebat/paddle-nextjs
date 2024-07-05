import React from "react";
import usePaddle from "../hooks/usePaddle";

const Pricing: React.FC = () => {
  const paddle = usePaddle();

  const handleCheckout = () => {
    if (paddle) {
      console.log("hello world");
      paddle.Checkout.open({
        items: [
          {
            priceId: "pri_01j1hkbamkejn2nfsz4fhcrete",
          },
        ],
        customer: {
          email: "customer@email.com",
        },
        // customData: {},  //own defined structure with key value pair
        settings: {
          allowedPaymentMethods: [
            "alipay",
            "apple_pay",
            "card",
            "google_pay",
            "paypal",
          ],
          successUrl: "",
        },
      });
    }
  };

 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-6">Pricing</h1>
      <div className="flex gap-4">
        <div className="bg-gray-500  shadow-md rounded-lg p-6 w-64 text-center">
          <h2 className="text-2xl font-semibold mb-2">Pro Plan</h2>
          <p className="text-xl mb-4">$10/month</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleCheckout}
          >
            Buy Now
          </button>
        </div>
        <div className="bg-gray-500  shadow-md rounded-lg p-6 w-64 text-center">
          <h2 className="text-2xl font-semibold mb-2">Pro Plan</h2>
          <p className="text-xl mb-4">$10/month</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    
          >
            Update Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
