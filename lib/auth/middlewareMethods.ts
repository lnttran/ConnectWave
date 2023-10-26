import { authOptions } from "@/app/config/authOption";
import { getServerSession } from "next-auth/next";
import { MiddlewareFunction } from "./pipeline";

export const middlewareRequestLogger: MiddlewareFunction = async (
  request: Request,
  response: Response
) => {
  const data = await request.json();
  console.log("Logging: " + JSON.stringify(data));

  return response;
};

export const middlewareAuthorizedSession: MiddlewareFunction = async () => {
  const session = await getServerSession(authOptions); // Replace with your authentication logic
  if (!session) {
    console.log("Unauthorized");
    return new Response(null, { status: 401, statusText: "Unauthorized" });
  }
  console.log("Authorized");
};
