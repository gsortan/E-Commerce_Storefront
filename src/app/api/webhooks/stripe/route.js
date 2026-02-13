import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/services/order/orderServices";
import { clearCartForUser } from "@/services/cart/cartServices";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price.product"],
    });

    const addr = fullSession.customer_details.address;
    const shipName = fullSession.customer_details.name;

    const userId = fullSession.metadata.userId;
    const items = fullSession.line_items.data;

    const orderItems = items.map((li) => ({
      productId: Number(li.price.product.metadata.productId),
      quantity: li.quantity ?? 0,
      price: (li.price.unit_amount / 100).toFixed(2),
    }));

    const totalAmount = fullSession.amount_total / 100;

    try {
      await createOrder({
        userId,
        items: orderItems,
        sessionId: fullSession.id,
        totalAmount,
        shipName: shipName,
        shipAddressLine1: addr.line1,
        shipAddressLine2: addr.line2,
        shipRegion: addr.state,
        shipCity: addr.city,
        shipCountry: addr.country,
        shipPostalCode: addr.postal_code,
      });

      await clearCartForUser(userId);
    } catch (e) {
      console.error("createOrder failed:", e);
  return NextResponse.json(
    { error: "Order creation failed" },
    { status: 500 }
  );
    }
  }

  return NextResponse.json({ received: true });
}
