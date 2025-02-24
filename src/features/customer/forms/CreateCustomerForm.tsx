import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast as sonner } from "sonner";
import { createCustomerFormSchema } from "../schemas";
import type { CreateCustomerFormSchema } from "../types";
import { CreateCustomerFormInner } from "./CreateCustomerFormInner";

export const CreateCustomerForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<CreateCustomerFormSchema>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
    },
    resolver: zodResolver(createCustomerFormSchema),
  });

  const { mutate: createCustomer, isPending: isCreateCustomerPending } =
    api.customer.create.useMutation({
      onSuccess: () => {
        sonner.success("Berhasil menambahkan data pelanggan");
        void router.replace("/dashboard/customer");
      },
      onError: (error) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message,
        });
      },
    });

  const onSubmit = (values: CreateCustomerFormSchema) => createCustomer(values);

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateCustomerFormInner
            formId="create-customer-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end">
        <Button form="create-customer-form" disabled={isCreateCustomerPending}>
          {!isCreateCustomerPending ? (
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
