import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type DeleteCustomerDialogProps = {
  customerId: string;
};

export const DeleteCustomerDialog = ({
  customerId,
}: DeleteCustomerDialogProps) => {
  const apiUtils = api.useUtils().customer;
  const { mutate: deleteCustomer } = api.customer.delete.useMutation({
    onSuccess: () => {
      toast.success("Berhasil menghapus data pelanggan");
      void apiUtils.invalidate();
    },
  });

  const handleDeleteCustomer = () => deleteCustomer({ id: customerId });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah kamu sudah benar - benar yakin?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data
            pelanggan Anda secara permanen dan menghapus data Anda dari server
            kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteCustomer}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
