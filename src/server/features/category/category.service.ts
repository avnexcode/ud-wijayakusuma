import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";
import { generateSlug } from "@/utils";
import { TRPCError } from "@trpc/server";
import { CategoryRepository } from "./category.repository";

export class CategoryService {
  static getAll = async (params: QueryParams) => {
    const categories = await CategoryRepository.findAll(params);

    return categories;
  };

  static getById = async (id: string) => {
    const category = await CategoryRepository.findUniqueId(id);

    if (!category) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Category with ID ${id} not found`,
      });
    }

    return category;
  };

  static create = async (request: CreateCategoryRequest) => {
    const existingCategory = await CategoryRepository.countUniqueName(
      request.name,
    );

    if (existingCategory !== 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Category with this name already exists",
      });
    }

    let slug = generateSlug(request.name);

    const existingSlug = await CategoryRepository.countSimilarSlug(slug);

    if (existingSlug !== 0) {
      slug = generateSlug(request.name, true);
    }

    const category = await CategoryRepository.insert({ ...request, slug });

    return category;
  };

  static update = async (id: string, request: UpdateCategoryRequest) => {
    const existingCategory = await CategoryRepository.findUniqueId(id);

    if (!existingCategory) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: ` category with ID ${id} not found`,
      });
    }

    let category;

    if (request.name && request.name !== existingCategory.name) {
      const existingCategoryByName = await CategoryRepository.countUniqueName(
        request.name,
      );

      if (existingCategoryByName !== 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Category with this name already exists",
        });
      }

      let slug = generateSlug(request.name);

      const existingSlug = await CategoryRepository.countSimilarSlug(slug);

      if (existingSlug !== 0) {
        slug = generateSlug(request.name, true);
      }

      category = await CategoryRepository.update(id, {
        ...request,
        slug,
      });
    } else {
      category = await CategoryRepository.update(id, {
        ...request,
        slug: existingCategory.slug,
      });
    }

    return category;
  };

  static delete = async (id: string) => {
    const existingCategory = await CategoryRepository.countUniqueId(id);

    if (existingCategory === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: ` category with ID ${id} not found`,
      });
    }

    const category = await CategoryRepository.destroy(id);
    return category;
  };
}
