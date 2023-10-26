import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { updateUser } from "./utils";

const accountUpdateSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters",
    })
    .max(50, {
      message: "Username must be at most 50 characters",
    })
    .refine((s) => !s.includes(" "), "Username cannot contain spaces"),
  role: z.string().refine(
    (value) => {
      return value === "hunter" || value === "quester";
    },
    {
      message: "Invalid Role",
    }
  ),
  email: z.string().email(),
});

export async function GET(request: NextRequest) {
  return Response.json("Get");
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
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
  } else {
    // Not Signed in
    return new Response(null, { status: 401, statusText: "Unauthenticated" });
  }
  return new Response(null, { status: 400, statusText: "Bad Request" });
}
