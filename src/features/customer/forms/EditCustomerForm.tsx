import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast as sonner } from "sonner";
import { EditCustomerFormSkeleton } from "../components/skeleton";
import { updateCustomerFormSchema } from "../schemas";
import type { UpdateCustomerFormSchema } from "../types";
import { CreateCustomerFormInner } from "./CreateCustomerFormInner";

type EditCustomerFormProps = {
  customerId: string;
};

export const EditCustomerForm = ({ customerId }: EditCustomerFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: customer, isLoading: isCustomerLoading } =
    api.customer.getById.useQuery(
      { id: customerId },
      { enabled: !!customerId },
    );

  const form = useForm<UpdateCustomerFormSchema>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
    },
    resolver: zodResolver(updateCustomerFormSchema),
  });

  useEffect(() => {
    if (customer) {
      form.reset({ ...customer, email: customer.email ?? "" });
    }
  }, [form, customer]);

  const { mutate: updateCustomer, isPending: isUpdateCustomerPending } =
    api.customer.update.useMutation({
      onSuccess: () => {
        sonner.success("Berhasil memperbarui data pelanggan");
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

  const onSubmit = (values: UpdateCustomerFormSchema) =>
    updateCustomer({
      id: customerId,
      request: values,
    });

  if (isCustomerLoading) {
    return <EditCustomerFormSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateCustomerFormInner
            formId="update-customer-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end space-x-5">
        <Button onClick={() => router.back()} className="w-[200px]">
          Batal
        </Button>
        <Button
          form="update-customer-form"
          disabled={isUpdateCustomerPending || !form.formState.isDirty}
          className="w-[200px]"
        >
          {!isUpdateCustomerPending ? (
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
