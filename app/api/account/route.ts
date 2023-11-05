import { getBalance, updateUser } from "./utils";
import { accountUpdateSchema } from "./schema";
import {
  middlewareAuthorizedSession,
  middlewareRequestLogger,
} from "@/lib/auth/middlewareMethods";
import { createMiddlewarePipeline } from "@/lib/auth/pipeline";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/config/authOption";

async function GET(request: Request, response: Response) {
  const session = await getServerSession(authOptions);

  if (session) {
    const balance = await getBalance({ email: session.user!.email as string });
    return new Response(JSON.stringify(balance), { status: 200 });
  }
}

async function POST(request: Request, response: Response) {
  // Be protected by default hehe
  try {
    const json = await request.json();
    const data = accountUpdateSchema.safeParse(json);

    console.log(data);
    if (!data.success) {
      return new Response(null, { status: 400, statusText: "Bad Request" });
    } else {
      const user = await updateUser(data.data);

      if (user) {
        return new Response(null, { status: 200 });
      }
    }
  } catch (e) {
    console.log(e);
    return new Response(null, { status: 400, statusText: "Bad Request" });
  }

  return new Response(null, { status: 400, statusText: "Bad Request" });
}

const handler = createMiddlewarePipeline(
  [middlewareAuthorizedSession],
  async (request, response) => {
    if (request.method === "POST") {
      POST(request, response);
    } else if (request.method === "GET") {
      return GET(request, response);
    }
  }
);

export { handler as GET, handler as POST };
