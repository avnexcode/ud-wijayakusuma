import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast as sonner } from "sonner";
import { updateOrderFormSchema } from "../schemas";
import type { UpdateOrderFormSchema } from "../types";
import { EditOrderFormInner } from "./EditOrderFormInner";
import { EditOrderFormSkeleton } from "../components/skeleton";

type EditOrderFormProps = {
  orderId: string;
};

export const EditOrderForm = ({ orderId }: EditOrderFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<UpdateOrderFormSchema>({
    defaultValues: {
      label: "",
      description: "",
      total: "",
      productId: "",
      customerId: "",
      sendingAt: new Date(),
      category: "WHOLESALE",
    },
    resolver: zodResolver(updateOrderFormSchema),
  });

  const { data: order, isLoading: isOrderLoading } = api.order.getById.useQuery(
    { id: orderId },
    { enabled: !!orderId },
  );

  const { mutate: updateOrder, isPending: isUpdateOrderPending } =
    api.order.update.useMutation({
      onSuccess: () => {
        sonner.success("Berhasil memperbarui data pesanan");
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

  const onSubmit = (values: UpdateOrderFormSchema) =>
    updateOrder({ id: orderId, request: values });

  useEffect(() => {
    if (order) {
      form.reset({ ...order, description: order.description ?? "" });
    }
  }, [form, order]);

  if (isOrderLoading) {
    return <EditOrderFormSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <EditOrderFormInner formId="update-order-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end gap-5">
        <Button onClick={() => router.back()}>Batal</Button>
        <Button
          form="update-order-form"
          disabled={isUpdateOrderPending || !form.formState.isDirty}
        >
          {!isUpdateOrderPending ? (
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
