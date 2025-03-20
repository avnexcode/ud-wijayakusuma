import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createOrderFormSchema } from "../schemas";
import type { CreateOrderFormSchema } from "../types";
import { CreateOrderFormInner } from "./CreateOrderFormInner";

export const CreateOrderForm = () => {
  const router = useRouter();
  const form = useForm<CreateOrderFormSchema>({
    defaultValues: {
      label: "",
      description: "",
      total: "",
      productId: "",
      customerId: "",
      sendingAt: new Date(),
      category: "WHOLESALE",
    },
    resolver: zodResolver(createOrderFormSchema),
  });
  const { mutate: createOrder, isPending: isCreateOrderPending } =
    api.order.create.useMutation({
      onSuccess: () => {
        toast.success("Berhasil membuat pesanan baru");
        void router.replace("/dashboard/order");
      },
    });

  const onSubmit = (values: CreateOrderFormSchema) => {
    createOrder({ request: values });
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateOrderFormInner
            formId="create-order-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="place-content-end pt-10">
        <Button form="create-order-form" disabled={isCreateOrderPending}>
          {!isCreateOrderPending ? (
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
