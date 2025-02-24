import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CustomerSelect } from "@/features/customer/components";
import { ProductSelect } from "@/features/product/components";
import { cn } from "@/lib/utils";
import { OrderCategory } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { CreateOrderFormSchema } from "../types";
import { inputHandle } from "@/utils";

type CreateOrderFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateOrderFormSchema) => void;
};

export const CreateOrderFormInner = ({
  formId,
  onSubmit,
}: CreateOrderFormInnerProps) => {
  const form = useFormContext<CreateOrderFormSchema>();
  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <FormField
        control={form.control}
        name="label"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Label <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Masukkan label" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex w-full items-center gap-5">
        <CustomerSelect<CreateOrderFormSchema>
          name="customer_id"
          label="Pelanggan"
          required
        />
        <ProductSelect<CreateOrderFormSchema>
          name="product_id"
          label="Produk"
          required
        />
      </div>
      <FormField
        control={form.control}
        name="total"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Total Pesanan <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkan total pesanan"
                {...field}
                onChange={(e) => {
                  inputHandle("onChange", "number", e);
                  field.onChange(e);
                }}
                onPaste={(e) => {
                  inputHandle("onPaste", "number", e);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <FormLabel>Kategori Pesanan</FormLabel>
            <Select onValueChange={onChange} defaultValue={value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={`Pilih status pesanan`} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  value={OrderCategory.WHOLESALE}
                  className="capitalize"
                >
                  Grosir
                </SelectItem>
                <SelectItem value={OrderCategory.RETAIL} className="capitalize">
                  Ecer
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sending_at"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Tanggal Pengiriman</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[280px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pilih tanggal pengiriman</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    console.log("Selected date:", date);
                    field.onChange(date);
                  }}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deskripsi</FormLabel>
            <FormControl>
              <Textarea placeholder="Masukkan deskripsi pesanan" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
