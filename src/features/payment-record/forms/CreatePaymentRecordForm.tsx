import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast as sonner } from "sonner";
import { createPaymentRecordFormSchema } from "../schemas";
import type { CreatePaymentRecordFormSchema } from "../types";
import { CreatePaymentRecordFormInner } from "./CreatePaymentRecordFormInner";

type CreatePaymentRecordFormProps = {
  isAddPaymentDisabled: boolean;
  isLoading: boolean;
  transaction_id: string;
  refetchTransaction: () => void;
};

export const CreatePaymentRecordForm = ({
  transaction_id,
  refetchTransaction,
  isAddPaymentDisabled,
  isLoading,
}: CreatePaymentRecordFormProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const form = useForm<CreatePaymentRecordFormSchema>({
    defaultValues: {
      amount: "",
      note_image_url: null,
    },
    resolver: zodResolver(createPaymentRecordFormSchema),
  });

  const {
    mutate: createPaymentRecord,
    isPending: isCreatePaymentRecordPending,
  } = api.paymentRecord.create.useMutation({
    onSuccess: () => {
      sonner.success("Berhasil menambahkan catatan pembayaran");
      refetchTransaction();
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const onSubmit = (values: CreatePaymentRecordFormSchema) => {
    if (values.note_image_url) {
      const reader = new FileReader();

      reader.onloadend = function () {
        const result = reader.result as string;
        const imageBase64 = result.substring(result.indexOf(",") + 1);

        createPaymentRecord({
          ...values,
          note_image_url: imageBase64,
          transaction_id,
        });
      };

      reader.readAsDataURL(values.note_image_url);
    } else {
      form.setError("note_image_url", {
        message: "Bukti pembayaran tidak boleh kosong",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Button disabled={isAddPaymentDisabled}>
            Buat Catatan Pembayaran
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <CreatePaymentRecordFormInner
            formId="create-payment-record-form"
            onSubmit={onSubmit}
          />
        </Form>
        <DialogFooter className="mt-5">
          <Button
            form="create-payment-record-form"
            disabled={isCreatePaymentRecordPending}
          >
            {!isCreatePaymentRecordPending ? (
              "Tambahkan"
            ) : (
              <>
                <Loader2 className="animate-spin" />
                Menambahkan...
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
