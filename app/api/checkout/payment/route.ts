import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getUser } from "../../account/utils";
import { authOptions } from "@/app/config/authOption";
import { getServerSession } from "next-auth/next";
import { middlewareAuthorizedSession } from "@/lib/auth/middlewareMethods";
import { createMiddlewarePipeline } from "@/lib/auth/pipeline";

async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  let data = await request.json();
  let priceId = data.priceId;

  // Get the user - we will protect this to protected
  // TODO: Protected
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await getUser({
      email: session!.user!.email!,
    });

    if (user) {
      const stripeSession = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/dashboard",
        cancel_url: "http://localhost:3000/dashboard",
        metadata: {
          userId: user.id,
          userEmail: user.email,
        },
      });

      return NextResponse.json(stripeSession.url);
    }
  }

  return new Response(null, { status: 400, statusText: "Bad Request" });
}

const handler = createMiddlewarePipeline(
  [middlewareAuthorizedSession],
  async (request) => {
    if (request.method === "POST") {
      return POST(request);
    }

    return new Response(null, { status: 200 });
  }
);

export { handler as POST };
