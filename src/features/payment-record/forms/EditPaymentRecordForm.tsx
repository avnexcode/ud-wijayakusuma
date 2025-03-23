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
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast as sonner } from "sonner";
import { updatePaymentRecordFormSchema } from "../schemas";
import type { UpdatePaymentRecordFormSchema } from "../types";
import { EditPaymentRecordFormInner } from "./EditPaymentRecordFormInner";

type EditPaymentRecordFormProps = {
  paymentRecordId: string;
  refetchTransaction: () => void;
};

export const EditPaymentRecordForm = ({
  paymentRecordId,
  refetchTransaction,
}: EditPaymentRecordFormProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const form = useForm<UpdatePaymentRecordFormSchema>({
    defaultValues: {
      amount: "",
      noteImageUrl: null,
    },
    resolver: zodResolver(updatePaymentRecordFormSchema),
  });

  const { data: paymentRecord } = api.paymentRecord.getById.useQuery(
    {
      id: paymentRecordId,
    },
    {
      enabled: !!paymentRecordId,
    },
  );

  useEffect(() => {
    if (paymentRecord) {
      form.reset({ amount: paymentRecord.amount });
    }
  }, [form, paymentRecord]);

  const {
    mutate: updatePaymentRecord,
    isPending: isUpdatePaymentRecordPending,
  } = api.paymentRecord.update.useMutation({
    onSuccess: () => {
      sonner.success("Berhasil memperbarui riwayat pembayaran");
      setIsDialogOpen(false);
      refetchTransaction();
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

  const onSubmit = (values: UpdatePaymentRecordFormSchema) => {
    if (values.noteImageUrl) {
      const reader = new FileReader();

      reader.onloadend = function () {
        const result = reader.result as string;
        const imageBase64 = result.substring(result.indexOf(",") + 1);

        updatePaymentRecord({
          id: paymentRecordId,
          request: {
            ...values,
            noteImageUrl: imageBase64,
          },
        });
      };

      reader.readAsDataURL(values.noteImageUrl);
    } else {
      form.setError("noteImageUrl", {
        message: "Bukti pembayaran tidak boleh kosong",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apakah kamu sudah benar - benar yakin?</DialogTitle>
          <DialogDescription>
            Tindakan ini akan memperbarui catatan pembayaran yang telah ada.
            Perubahan akan disimpan secara permanen. Pastikan semua informasi
            sudah sesuai sebelum menyimpan.
          </DialogDescription>
        </DialogHeader>
        <div className="py-10">
          <Form {...form}>
            <EditPaymentRecordFormInner
              formId="update-payment-record-form"
              onSubmit={onSubmit}
            />
          </Form>
        </div>
        <DialogFooter className="mt-10">
          <Button
            form="update-payment-record-form"
            disabled={isUpdatePaymentRecordPending || !form.formState.isDirty}
            className="w-[200px]"
          >
            {!isUpdatePaymentRecordPending ? (
              "Perbarui"
            ) : (
              <>
                <Loader2 className="animate-spin" />
                Memperbarui...
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
