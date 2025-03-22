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
import { useSelectParams } from "@/hooks";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { renderElements } from "@/utils/render-elements";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type CategorySelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
};

export const CategorySelect = <T extends FieldValues>({
  name,
  label,
  required = false,
  className,
}: CategorySelectProps<T>) => {
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
  const selectedCategoryId = form.watch(name);

  const { data: selectedCategory, isLoading: isSelectedCategoryLoading } =
    api.category.getById.useQuery(
      { id: selectedCategoryId },
      {
        enabled: !!selectedCategoryId,
        staleTime: Infinity,
      },
    );

  const { data: categories, isLoading: isCategoriesLoading } =
    api.category.getAll.useQuery({
      params: {
        limit: ITEMS_PER_PAGE,
        sort: "name",
        order: "asc",
        page,
        search: debouncedSearchTerm || undefined,
      },
    });

  useEffect(() => {
    if (form.control && categories && !isCategoriesLoading) {
      setIsReady(true);
      setTotalData(categories.meta.total);
    }
  }, [form.control, categories, isCategoriesLoading]);

  const allCategories = categories?.data ?? [];
  const combinedCategories = [...allCategories];

  if (
    selectedCategory &&
    !allCategories.some((category) => category.id === selectedCategory.id)
  ) {
    combinedCategories.unshift(selectedCategory);
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
                  {selectedCategory?.name ?? `Pilih ${label.toLowerCase()}`}
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

              {isCategoriesLoading || isSelectedCategoryLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <>
                  {renderElements({
                    of: combinedCategories,
                    keyExtractor: (category) => category.id,
                    render: (category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                        className="capitalize"
                      >
                        {category.name}
                      </SelectItem>
                    ),
                    fallback: (
                      <SelectItem value="none" disabled>
                        Tidak ada data kategori tersedia
                      </SelectItem>
                    ),
                  })}

                  <SelectPagination
                    currentPage={page}
                    totalPages={totalPages}
                    isLoading={isCategoriesLoading}
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
