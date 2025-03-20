import type {
  CreateProductRequest,
  UpdateProductRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";
import { ProductRepository } from "./product.repository";
import { TRPCError } from "@trpc/server";
import { generateSlug } from "@/utils";

export class ProductService {
  static getAll = async (params: QueryParams) => {
    const products = await ProductRepository.findAll(params);

    return products;
  };

  static getById = async (id: string) => {
    const product = await ProductRepository.findUniqueId(id);

    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Product  with ID ${id} not found`,
      });
    }

    return product;
  };

  static create = async (request: CreateProductRequest) => {
    let slug = generateSlug(request.name);

    const existsSlug = await ProductRepository.countSimilarSlug(slug);

    if (existsSlug !== 0) {
      slug = generateSlug(request.name, true);
    }

    const product = await ProductRepository.insert({ ...request, slug });

    return product;
  };

  static update = async (id: string, request: UpdateProductRequest) => {
    const existingProduct = await ProductRepository.findUniqueId(id);

    if (!existingProduct) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Product  with ID ${id} not found`,
      });
    }

    let product;

    if (request.name) {
      let slug = generateSlug(request.name);

      const existingSlug = await ProductRepository.countSimilarSlug(slug);

      if (existingSlug !== 0) {
        slug = generateSlug(request.name, true);
      }
      product = await ProductRepository.update(id, { ...request, slug });
    } else {
      product = await ProductRepository.update(id, {
        ...request,
        slug: existingProduct.slug,
      });
    }

    return product;
  };

  static delete = async (id: string) => {
    const existingProduct = await ProductRepository.countUniqueId(id);

    if (existingProduct === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Product  with ID ${id} not found`,
      });
    }

    const product = await ProductRepository.destroy(id);

    return product.id;
  };
}
