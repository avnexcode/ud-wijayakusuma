import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createProductFormSchema } from "../schemas";
import type { CreateProductFormSchema } from "../types";
import { CreateProductFormInner } from "./CreateProductFormInner";

export const CreateProductForm = () => {
  const router = useRouter();
  const form = useForm<CreateProductFormSchema>({
    defaultValues: {
      name: "",
      price: "",
      categoryId: "",
      description: "",
    },
    resolver: zodResolver(createProductFormSchema),
  });

  const { mutate: createProduct, isPending: isCreateProductPending } =
    api.product.create.useMutation({
      onSuccess: () => {
        toast.success("Berhasil menambahkan product ");
        void router.replace("/dashboard/product");
      },
    });

  const onSubmit = (values: CreateProductFormSchema) =>
    createProduct({ request: values });

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateProductFormInner
            formId="create-product--form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end">
        <Button
          form="create-product--form"
          disabled={isCreateProductPending}
          className="w-[200px]"
        >
          {!isCreateProductPending ? (
            "Tambahkan"
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Menambahkan...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
