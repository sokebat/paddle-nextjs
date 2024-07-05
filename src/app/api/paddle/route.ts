import addData from "@/firebase/utils/add-data";
import { validateSignature } from "@/utils/validate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("Paddle-Signature");
    console.log(signature);
    if (!signature) {
      return NextResponse.json(
        { message: "Missing Paddle-Signature header!" },
        { status: 400 }
      );
    }

    const body = await req.text();

    const PADDLE_WEBHOOK_SECRET =
      process.env.NEXT_PUBLIC_PADDLE_WEBHOOK_SECRET!;

    if (!PADDLE_WEBHOOK_SECRET) {
      throw new Error("PADDLE_WEBHOOK_SECRET is not set");
    }

    const isValid = await validateSignature(
      signature,
      body,
      PADDLE_WEBHOOK_SECRET
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid webhook signature!" },
        { status: 401 }
      );
    }

    const parsedBody = JSON.parse(body);
    const { data, event_type } = parsedBody;

    switch (event_type) {
      case "subscription.created":
        const subscriptionCreatedData = {
          subscription_id: data.id,
          product_info: data.items,
          status: data.status,
          updated_at: data.updated_at,
        };
        try {
          const { result, error } = await addData({
            collectionName: "Subscription Created ",
            // id: data.user_id,
            id: "user6",
            data: subscriptionCreatedData,
          });

          if (error) {
            console.error("Firebase error:", error);
          } else {
            console.log("Data added successfully:", result);
          }
        } catch (e) {
          console.error("Error adding data:", e);
        }
        break;

      case "transaction.completed":
        const transactionCompletedData = {
          transaction_id: data.id,
          subscription_id: data.subscription_id,
          product_info: data.items,
          // user_data: data.custom_data || '',
          status: data.status,
          payments: data.Payments,
          billing_period: data.billing_period,
          updated_at: data.updated_at,
        };

        try {
          const { result, error } = await addData({
            collectionName: "Transaction Completed",
            id: "user6",

            data: transactionCompletedData,
          });

          if (error) {
            console.error("Firebase error:", error);
          } else {
            console.log("Data added successfully:", result);
          }
        } catch (e) {
          console.error("Error adding data:", e);
        }
        break;
      case "transaction.cancel":
        console.log(data);
        const transactionCancelData = {
          transaction_id: data.id,
          subscription_id: data.subscription_id,
          product_info: data.items,
          // user_data: data.custom_data || '',
          status: data.status,
          payments: data.Payments,
          billing_period: data.billing_period,
          updated_at: data.updated_at,
        };

        try {
          const { result, error } = await addData({
            collectionName: "Transaction Cancel",
            id: "user6",

            data: transactionCancelData,
          });

          if (error) {
            console.error("Firebase error:", error);
          } else {
            console.log("Data added successfully:", result);
          }
        } catch (e) {
          console.error("Error adding data:", e);
        }
        break;

      case "transaction.updated":
        console.log("transactionupdates", data);
        const transactionUpdatedData = {
          transaction_id: data.id,
          subscription_id: data.subscription_id || "",
          product_info: data.items,
          // user_data: data.custom_data || '',
          status: data.status,

          payments: data.Payments,
          billing_period: data.billing_period,
          updated_at: data.updated_at,
        };

        try {
          const { result, error } = await addData({
            collectionName: "Transaction Updated",
            id: "user6",

            data: transactionUpdatedData,
          });

          if (error) {
            console.error("Firebase error:", error);
          } else {
            console.log("Data added successfully:", result);
          }
        } catch (e) {
          console.error("Error adding data:", e);
        }
        break;

      default:
        console.warn("Unhandled event type:", event_type);
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
