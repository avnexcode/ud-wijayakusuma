import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ProductService } from "@/server/features/product";
import { errorFilter } from "@/server/filters";
import {
  createProductRequest,
  queryParams,
  updateProductRequest,
} from "@/server/validations";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        params: queryParams,
      }),
    )
    .query(async ({ input }) => {
      const { params } = input;
      try {
        const products = await ProductService.getAll(params);
        return products;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const product = await ProductService.getById(id);
        return product;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: publicProcedure
    .input(z.object({ request: createProductRequest }))
    .mutation(async ({ input }) => {
      const { request } = input;
      try {
        const product = await ProductService.create(request);
        return product;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        request: updateProductRequest,
      }),
    )
    .mutation(async ({ input }) => {
      const { id, request } = input;
      try {
        const product = await ProductService.update(id, request);
        return product;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const product = await ProductService.delete(id);
        return product;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
