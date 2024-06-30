import { validateSignature } from "@/utils/validate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("Paddle-Signature");
    if (!signature) {
      return NextResponse.json(
        { message: "Missing Paddle-Signature header!" },
        { status: 400 }
      );
    }

    const body = await req.text();
    console.log("Received body:", body);

    const isValid = await validateSignature(
      signature,
      body,
      process.env.PADDLE_WEBHOOK_SECRET!
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid webhook signature!" },
        { status: 401 }
      );
    }

    const parsedBody = JSON.parse(body);

    switch (parsedBody.event_type) {
      case "subscription.created":
        // handle subscription created event
        console.log("Subscription created:", parsedBody);
        break;
      case "subscription.updated":
        // handle subscription updated event
        console.log("Subscription updated:", parsedBody);
        break;
      case "subscription.cancelled":
        // handle subscription cancelled event
        console.log("Subscription cancelled:", parsedBody);
        break;
      case "transaction.completed":
        // handle transaction succeeded event
        console.log("Transaction completed:", parsedBody);
        break;
      default:
        console.log("Unhandled event type:", parsedBody.event_type);
        break;
    }

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
