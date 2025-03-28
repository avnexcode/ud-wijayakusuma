import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EditProductFormSkeleton } from "../components/skeleton";
import { updateProductFormSchema } from "../schemas";
import type { UpdateProductFormSchema } from "../types";
import { EditProductFormInner } from "./EditProductFormInner";

type EditProductFormProps = {
  productId: string;
};

export const EditProductForm = ({ productId }: EditProductFormProps) => {
  const router = useRouter();

  const { data: product, isLoading: isProductLoading } =
    api.product.getById.useQuery(
      {
        id: productId,
      },
      {
        enabled: !!productId,
      },
    );

  const form = useForm<UpdateProductFormSchema>({
    defaultValues: {
      name: "",
      price: "",
      categoryId: "",
      description: "",
      orderCategory: "WHOLESALE",
    },
    resolver: zodResolver(updateProductFormSchema),
  });

  const { mutate: updateProduct, isPending: isUpdateProductPending } =
    api.product.update.useMutation({
      onSuccess: () => {
        toast.success("Berhasil memperbarui kategori produk");
        void router.replace("/dashboard/product");
      },
    });

  const onSubmit = (values: UpdateProductFormSchema) =>
    updateProduct({ id: productId, request: values });

  useEffect(() => {
    if (product) {
      form.reset({
        ...product,
        description: product.description ?? "",
      });
    }
  }, [form, product]);

  if (isProductLoading) {
    return <EditProductFormSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <EditProductFormInner
            formId="update-product--form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end gap-5">
        <Button onClick={() => router.back()} className="w-[200px]">
          Batal
        </Button>
        <Button
          form="update-product--form"
          disabled={isUpdateProductPending || !form.formState.isDirty}
          className="w-[200px]"
        >
          {!isUpdateProductPending ? (
            "Perbarui"
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Memperbarui...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
