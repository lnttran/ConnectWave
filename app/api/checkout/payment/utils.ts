import prisma from "@/lib/singleton/prisma";
import { PaymentIntents } from "@prisma/client";
import { connect } from "http2";

export interface IntentData {
  intent_id: string;
  amount_captured: number;
  amount_refunded: number;
  userId: string;
}

export const createIntent = async (
  intentData: IntentData
): Promise<PaymentIntents> => {
  const { intent_id, amount_captured, amount_refunded, userId } = intentData;
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      paymentIntents: {
        create: [
          {
            intent_id: intent_id,
            amountCaptured: amount_captured,
            amountRefunded: amount_refunded,
          },
        ],
      },
    },
  });
  return await prisma.paymentIntents.findUniqueOrThrow({
    where: {
      intent_id: intent_id,
    },
  });
};

type PaymentIntentsWithUser = PaymentIntents & {
  user: {
    email: string | null;
    id: string | null;
  };
};

export const getIntent = async ({
  intentId,
}: {
  intentId: string;
}): Promise<PaymentIntentsWithUser | null> => {
  const paymentIntent = await prisma.paymentIntents.findUnique({
    where: {
      intent_id: intentId,
    },
    include: {
      user: {
        select: {
          email: true,
          id: true,
        },
      },
    },
  });

  return paymentIntent as PaymentIntentsWithUser | null;
};

interface IntentUpdate {
  intent_id: string;
  captured: number;
  refunded: number;
}
export const updateIntent = async (updateIntent: IntentUpdate) => {
  const { intent_id, captured, refunded } = updateIntent;
  return await prisma.paymentIntents.update({
    where: {
      intent_id: intent_id,
    },
    data: {
      amountCaptured: captured,
      amountRefunded: refunded,
    },
  });
};
