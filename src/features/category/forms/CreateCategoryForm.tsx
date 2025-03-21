import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCategoryFormSchema } from "../schemas";
import type { CreateCategoryFormSchema } from "../types";
import { CreateCategoryFormInner } from "./CreateCategoryFormInner";

export const CreateCategoryForm = () => {
  const router = useRouter();
  const form = useForm<CreateCategoryFormSchema>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(createCategoryFormSchema),
  });

  const { mutate: createCategory, isPending: isCreateCategoryPending } =
    api.category.create.useMutation({
      onSuccess: () => {
        toast.success("Berhasil menambahkan  category");
        void router.replace("/dashboard/category");
      },
    });

  const onSubmit = (values: CreateCategoryFormSchema) =>
    createCategory({ request: values });

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateCategoryFormInner
            formId="create--category-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end">
        <Button
          form="create--category-form"
          disabled={isCreateCategoryPending}
          className="w-[200px]"
        >
          {!isCreateCategoryPending ? (
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
