import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { UpdatePaymentRecordFormSchema } from "../types";
import { inputHandle } from "@/utils";

type EditPaymentRecordFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdatePaymentRecordFormSchema) => void;
};

export const EditPaymentRecordFormInner = ({
  formId,
  onSubmit,
}: EditPaymentRecordFormInnerProps) => {
  const form = useFormContext<UpdatePaymentRecordFormSchema>();
  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Masukkan Nominal<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkan nominal"
                {...field}
                onChange={(e) => {
                  inputHandle("onChange", "number", e);
                  field.onChange(e);
                }}
                onPaste={(e) => {
                  inputHandle("onPaste", "number", e);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
