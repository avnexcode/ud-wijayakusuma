import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast as sonner } from "sonner";
import { createOrderFormSchema } from "../schemas";
import type { CreateOrderFormSchema } from "../types";
import { CreateOrderFormInner } from "./CreateOrderFormInner";
import { useToast } from "@/hooks";

export const CreateOrderForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<CreateOrderFormSchema>({
    defaultValues: {
      label: "",
      description: "",
      total: "",
      productId: "",
      customerId: "",
      discount: "NONE",
      totalDiscount: "",
      sendingAt: new Date(),
    },
    resolver: zodResolver(createOrderFormSchema),
  });
  const { mutate: createOrder, isPending: isCreateOrderPending } =
    api.order.create.useMutation({
      onSuccess: () => {
        sonner.success("Berhasil membuat pesanan baru");
        void router.replace("/dashboard/order");
      },
      onError: (error) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message,
        });
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
      <CardFooter className="mt-10 place-content-end">
        <Button
          form="create-order-form"
          disabled={isCreateOrderPending}
          className="w-[200px]"
        >
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
