import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { inputHandle } from "@/utils";
import { useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { CreatePaymentRecordFormSchema } from "../types";

type CreatePaymentRecordFormInnerProps = {
  formId: string;
  onSubmit: (values: CreatePaymentRecordFormSchema) => void;
};

export const CreatePaymentRecordFormInner = ({
  formId,
  onSubmit,
}: CreatePaymentRecordFormInnerProps) => {
  const form = useFormContext<CreatePaymentRecordFormSchema>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOpenFileExplorer = () => {
    inputFileRef.current?.click();
  };

  const selectedImage = form.watch("noteImageUrl");

  const selectedImagePreview = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
    return null;
  }, [selectedImage]);

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <FormField
        control={form.control}
        name="noteImageUrl"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>
              Upload Nota <span className="text-red-500">*</span>
            </FormLabel>
            <div className="flex flex-col gap-2">
              {selectedImagePreview && (
                <div className="relative mt-2 max-h-[500px] w-full overflow-auto rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedImagePreview}
                    alt="Payment note preview"
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleOpenFileExplorer}
                  size="sm"
                >
                  {!!selectedImage ? "Ganti File" : "Pilih File"}
                </Button>
              </div>

              <input
                {...field}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    onChange(e.target.files[0]);
                  }
                }}
                className="hidden"
                type="file"
                ref={inputFileRef}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Masukkan Nominal <span className="text-red-500">*</span>
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
