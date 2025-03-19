import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CustomerService } from "@/server/features/customer";
import { errorFilter } from "@/server/filters";
import {
  createCustomerRequest,
  queryParams,
  updateCustomerRequest,
} from "@/server/validations";
import { z } from "zod";

export const customerRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        params: queryParams,
      }),
    )
    .query(async ({ input }) => {
      const { params } = input;
      try {
        const customers = await CustomerService.getAll(params);
        return customers;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const customer = await CustomerService.getById(id);

        return customer;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: publicProcedure
    .input(z.object({ request: createCustomerRequest }))
    .mutation(async ({ input }) => {
      const { request } = input;
      try {
        const customer = await CustomerService.create(request);
        return customer;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        request: updateCustomerRequest,
      }),
    )
    .mutation(async ({ input }) => {
      const { id, request } = input;
      try {
        const customer = await CustomerService.update(id, request);
        return customer;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const customer = await CustomerService.delete(id);
        return customer;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
