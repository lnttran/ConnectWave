import { updateBalance } from "../account/utils";
import {
  IntentData,
  createIntent,
  getIntent,
  updateIntent,
} from "../checkout/payment/utils";

export async function POST(request: Request) {
  const event = await request.json();
  // Get the body of the event
  const eventBody = event.data.object;

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const intentData: IntentData = {
        intent_id: eventBody.payment_intent,
        amount_captured: eventBody.amount_total,
        amount_refunded: 0,
        userId: eventBody.metadata.userId,
      };

      // Create a payment intent with captured and refunded amount
      const paymentIntentObject = await createIntent(intentData);

      // Update the fund for the user
      await updateBalance({
        userId: eventBody.metadata.userId as string,
        email: eventBody.metadata.email as string,
        balance:
          paymentIntentObject.amountCaptured -
          paymentIntentObject.amountRefunded,
      });

      break;
    case "charge.refunded":
      // Look up payment intent by payment_intent
      const paymentIntentWithUserObject = await getIntent({
        intentId: eventBody.payment_intent as string,
      });

      if (paymentIntentWithUserObject) {
        // await updateIntent({
        //   eventBody.payment_intent,
        //   eventBody.amount_refunded
        // })
        // Update the fund for the user
        await updateBalance({
          userId: paymentIntentWithUserObject.user.id as string,
          email: paymentIntentWithUserObject.user.email as string,
          balance: 0 - eventBody.amount_refunded,
        });
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
