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

type CustomerSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
};

export const CustomerSelect = <T extends FieldValues>({
  name,
  label,
  required = false,
  className,
}: CustomerSelectProps<T>) => {
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
  const selectedCustomerId = form.watch(name);

  const { data: selectedCustomer, isLoading: isSelectedCustomerLoading } =
    api.customer.getById.useQuery(
      { id: selectedCustomerId },
      {
        enabled: !!selectedCustomerId,
        staleTime: Infinity,
      },
    );

  const { data: customers, isLoading: isCustomersLoading } =
    api.customer.getAll.useQuery({
      params: {
        limit: ITEMS_PER_PAGE,
        sort: "name",
        order: "asc",
        page,
        search: debouncedSearchTerm || undefined,
      },
    });

  useEffect(() => {
    if (form.control && customers && !isCustomersLoading) {
      setIsReady(true);
      setTotalData(customers.meta.total);
    }
  }, [form.control, customers, isCustomersLoading]);

  const allCustomers = customers?.data ?? [];
  const combinedCustomers = [...allCustomers];

  if (
    selectedCustomer &&
    !allCustomers.some((customer) => customer.id === selectedCustomer.id)
  ) {
    combinedCustomers.unshift(selectedCustomer);
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
                  {selectedCustomer?.name ?? `Pilih ${label.toLowerCase()}`}
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

              {isCustomersLoading || isSelectedCustomerLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <>
                  {renderElements({
                    of: combinedCustomers,
                    keyExtractor: (customer) => customer.id,
                    render: (customer) => (
                      <SelectItem
                        key={customer.id}
                        value={customer.id}
                        className="capitalize"
                      >
                        {customer.name}
                      </SelectItem>
                    ),
                    fallback: (
                      <SelectItem value="none" disabled>
                        Tidak ada data pelanggan tersedia
                      </SelectItem>
                    ),
                  })}

                  <SelectPagination
                    currentPage={page}
                    totalPages={totalPages}
                    isLoading={isCustomersLoading}
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
