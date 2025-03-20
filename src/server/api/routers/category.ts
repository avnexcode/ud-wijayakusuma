import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CategoryService } from "@/server/features/category";
import { errorFilter } from "@/server/filters";
import { z } from "zod";
import {
  createCategoryRequest,
  queryParams,
  updateCategoryRequest,
} from "../../validations";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        params: queryParams,
      }),
    )
    .query(async ({ input }) => {
      const { params } = input;
      try {
        const category = await CategoryService.getAll(params);
        return category;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const category = await CategoryService.getById(id);
        return category;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: publicProcedure
    .input(z.object({ request: createCategoryRequest }))
    .mutation(async ({ input }) => {
      const { request } = input;
      try {
        const category = await CategoryService.create(request);

        return category;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        request: updateCategoryRequest,
      }),
    )
    .mutation(async ({ input }) => {
      const { id, request } = input;
      try {
        const category = await CategoryService.update(id, request);
        return category;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const category = await CategoryService.delete(id);
        return category.id;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
