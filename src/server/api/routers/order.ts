import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { OrderService } from "@/server/features/order";
import { errorFilter } from "@/server/filters";
import {
  createOrderRequest,
  queryParams,
  updateOrderRequest,
} from "@/server/validations";
import { z } from "zod";

export const orderRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        params: queryParams,
      }),
    )
    .query(async ({ input }) => {
      const { params } = input;
      try {
        const orders = await OrderService.getAll(params);
        return orders;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const order = await OrderService.getById(id);
        return order;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: publicProcedure
    .input(z.object({ request: createOrderRequest }))
    .mutation(async ({ input }) => {
      const { request } = input;
      try {
        const order = await OrderService.create(request);
        return order;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        request: updateOrderRequest,
      }),
    )
    .mutation(async ({ input }) => {
      const { id, request } = input;
      try {
        const order = await OrderService.update(id, request);
        return order;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const order = await OrderService.delete(id);
        return order;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
