import { SelectPagination } from "@/components/elements/SelectPagination";
import { SelectSearch } from "@/components/elements/SelectSearch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoryLabel } from "@/features/order/utils";
import { useSelectParams } from "@/hooks";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { renderElements } from "@/utils/render-elements";
import { type OrderCategory } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type ProductSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
};

export const ProductSelect = <T extends FieldValues>({
  name,
  label,
  required = false,
  className,
}: ProductSelectProps<T>) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);

  const ITEMS_PER_PAGE = 15;

  const {
    page,
    totalPages,
    searchTerm,
    debouncedSearchTerm,
    handlePageChange,
    handleSearchChange,
    handleSearchInputClick,
  } = useSelectParams({
    totalData: totalData,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const form = useFormContext<T>();
  const selectedProductId = form.watch(name);

  const { data: selectedProduct, isLoading: isSelectedProductLoading } =
    api.product.getById.useQuery(
      { id: selectedProductId },
      {
        enabled: !!selectedProductId,
        staleTime: Infinity,
      },
    );

  const { data: products, isLoading: isProductsLoading } =
    api.product.getAll.useQuery({
      params: {
        limit: ITEMS_PER_PAGE,
        sort: "name",
        order: "asc",
        page,
        search: debouncedSearchTerm || undefined,
      },
    });

  useEffect(() => {
    if (form.control && products && !isProductsLoading) {
      setIsReady(true);
      setTotalData(products.meta.total);
    }
  }, [form.control, products, isProductsLoading]);

  const allProducts = products?.data ?? [];
  const combinedProducts = [...allProducts];

  if (
    selectedProduct &&
    !allProducts.some((product) => product.id === selectedProduct.id)
  ) {
    combinedProducts.unshift(selectedProduct);
  }

  if (!isReady) {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem className={cn("w-full", className)}>
          <FormLabel className="capitalize">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select
            onValueChange={onChange}
            value={value ?? ""}
            defaultValue={value}
            onOpenChange={setIsOpen}
            open={isOpen}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Pilih ${label.toLowerCase()}`}>
                  ({getCategoryLabel(selectedProduct?.orderCategory)}) -{" "}
                  {selectedProduct?.name ?? `Pilih ${label.toLowerCase()}`}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectSearch
                searchTerm={searchTerm}
                totalPages={totalPages}
                onSearchChange={handleSearchChange}
                onClick={handleSearchInputClick}
              />

              {isProductsLoading || isSelectedProductLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <>
                  {renderElements({
                    of: combinedProducts,
                    keyExtractor: (product) => product.id,
                    render: (product) => (
                      <SelectItem
                        key={product.id}
                        value={product.id}
                        className="capitalize"
                      >
                        ({getCategoryLabel(product.orderCategory)}) -{" "}
                        {product.name}
                      </SelectItem>
                    ),
                    fallback: (
                      <SelectItem value="none" disabled>
                        Tidak ada data produk tersedia
                      </SelectItem>
                    ),
                  })}

                  <SelectPagination
                    currentPage={page}
                    totalPages={totalPages}
                    isLoading={isProductsLoading}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
