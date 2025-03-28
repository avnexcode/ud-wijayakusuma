import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateProductFormSchema } from "../types";
import { CategorySelect } from "@/features/category/components";
import { inputHandle } from "@/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderCategory } from "@prisma/client";

type CreateProductFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateProductFormSchema) => void;
};

export const CreateProductFormInner = ({
  formId,
  onSubmit,
}: CreateProductFormInnerProps) => {
  const form = useFormContext<CreateProductFormSchema>();
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
              Name <span className="text-red-500">*</span>
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
              Harga <span className="text-red-500">*</span>
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
      <CategorySelect<CreateProductFormSchema>
        name="categoryId"
        label="Kategori"
        required
      />
      <FormField
        control={form.control}
        name="orderCategory"
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <FormLabel>
              Kategori Pesanan <span className="text-red-500">*</span>
            </FormLabel>
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
