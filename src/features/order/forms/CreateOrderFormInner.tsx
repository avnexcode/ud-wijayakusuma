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
import { Textarea } from "@/components/ui/textarea";
import { CustomerSelect } from "@/features/customer/components";
import { ProductSelect } from "@/features/product/components";
import { cn } from "@/lib/utils";
import { inputHandle } from "@/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { CreateOrderFormSchema } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Discount } from "@prisma/client";

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
          name="customerId"
          label="Pelanggan"
          required
        />
        <ProductSelect<CreateOrderFormSchema>
          name="productId"
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
      <div className="flex items-center gap-5">
        <FormField
          control={form.control}
          name="totalDiscount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Total Diskon</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan total diskon"
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
          name="discount"
          render={({ field: { onChange, value } }) => (
            <FormItem className="w-[300px]">
              <FormLabel>Diskon</FormLabel>
              <Select onValueChange={onChange} defaultValue={value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Pilih status pesanan"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Discount.NONE}>
                    Tidak ada diskon
                  </SelectItem>
                  <SelectItem value={Discount.NOMINAL}>Nominal</SelectItem>
                  <SelectItem value={Discount.PERCENTAGE}>Persen</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="sendingAt"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel>
              Tanggal Pengiriman <span className="text-red-500">*</span>
            </FormLabel>
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
