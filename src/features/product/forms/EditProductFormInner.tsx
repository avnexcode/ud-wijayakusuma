import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelect } from "@/features/category/components";
import { inputHandle } from "@/utils";
import { useFormContext } from "react-hook-form";
import type { UpdateProductFormSchema } from "../types";
import { OrderCategory } from "@prisma/client";

type EditProductFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateProductFormSchema) => void;
};

export const EditProductFormInner = ({
  formId,
  onSubmit,
}: EditProductFormInnerProps) => {
  const form = useFormContext<UpdateProductFormSchema>();
  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name Produk <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Masukkan nama produk" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Harga Produk <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkan harga produk"
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
      <CategorySelect<UpdateProductFormSchema>
        name="categoryId"
        label="Kategori"
        required
      />
      <FormField
        control={form.control}
        name="orderCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Kategori Pesanan <span className="text-red-500">*</span>
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deskripsi</FormLabel>
            <FormControl>
              <Textarea placeholder="Masukkan deskripsi produk" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
