export type MiddlewareHandler = (
  request: Request,
  response: Response
) => Promise<Response | undefined>;

export type MiddlewareFunction = (
  request: Request,
  response: Response
) => Promise<Response | undefined>;

export const createMiddlewarePipeline = (
  middlewares: MiddlewareFunction[],
  finalHandler: MiddlewareHandler
): MiddlewareHandler => {
  return async (request: Request, response: Response) => {
    for (const middleware of middlewares) {
      const result = await middleware(request, response);
      if (result instanceof Response) {
        return result;
      }
    }
    return await finalHandler(request, response);
  };
};
