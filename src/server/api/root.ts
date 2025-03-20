import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import {
  customerRouter,
  productRouter,
  categoryRouter,
  orderRouter,
  transactionRouter,
  paymentRecordRouter,
  authRouter,
  userRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  customer: customerRouter,
  category: categoryRouter,
  product: productRouter,
  order: orderRouter,
  transaction: transactionRouter,
  paymentRecord: paymentRecordRouter,
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
