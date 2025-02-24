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
import { EditCategoryFormSkeleton } from "../components/skeleton";
import { updateCategoryFormSchema } from "../schemas";
import type { UpdateCategoryFormSchema } from "../types";
import { EditCategoryFormInner } from "./EditCategoryFormInner";

type EditCategoryFormProps = {
  categoryId: string;
};

export const EditCategoryForm = ({ categoryId }: EditCategoryFormProps) => {
  const router = useRouter();
  const { data: category, isLoading: isCategoryLoading } =
    api.category.getById.useQuery(
      {
        id: categoryId,
      },
      {
        enabled: !!categoryId,
      },
    );
  const form = useForm<UpdateCategoryFormSchema>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(updateCategoryFormSchema),
  });

  const { mutate: updateCategory, isPending: isUpdateCategoryPending } =
    api.category.update.useMutation({
      onSuccess: () => {
        toast.success("Berhasil memperbarui kategori produk");
        void router.replace("/dashboard/category");
      },
    });

  const onSubmit = (values: UpdateCategoryFormSchema) =>
    updateCategory({ id: categoryId, request: values });

  useEffect(() => {
    if (category) {
      form.reset({
        ...category,
        description: category.description ?? "",
      });
    }
  }, [form, category]);

  if (isCategoryLoading) {
    return <EditCategoryFormSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <EditCategoryFormInner
            formId="update-category-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end gap-5">
        <Button onClick={() => router.back()}>Batal</Button>
        <Button
          form="update-category-form"
          disabled={isUpdateCategoryPending || !form.formState.isDirty}
        >
          {!isUpdateCategoryPending ? (
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
