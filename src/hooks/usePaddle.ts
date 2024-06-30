 
import {
  initializePaddle,
  InitializePaddleOptions,
  Paddle,
} from "@paddle/paddle-js";
import { useState } from "react";

export default function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>();

  const initPaddle = async () => {
    try {
      const paddleInstance = await initializePaddle({
        environment: "sandbox",
        seller: 20732,
        token: process.env.PADDLE_CLIENT_TOKEN,
      } as unknown as InitializePaddleOptions);

      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
      console.log(paddle);
    } catch (error) {
      console.error("Failed to initialize Paddle:", error);
    }
  };

  initPaddle();

  return paddle;
}


 