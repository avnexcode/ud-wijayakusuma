import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks";
import { api } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast as sonner } from "sonner";
import { registerFormSchema } from "../schemas";
import type { RegisterFormSchema } from "../types";
import { RegisterFormInner } from "./RegisterFormInner";
import { useRouter } from "next/router";

export const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<RegisterFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate: register, isPending: isRegisterPending } =
    api.auth.register.useMutation({
      onSuccess: () => {
        form.reset();
        sonner.success("Pendaftaran berhasil");
        void router.replace("/settings/user");
      },
      onError: () => {
        form.setValue("password", "");
        form.setValue("confirm_password", "");
        toast({
          title: "Error",
          variant: "destructive",
          description: "Pendaftaran gagal",
        });
      },
    });

  const onSubmit = (values: RegisterFormSchema) =>
    register({ request: values });

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <RegisterFormInner formId="register-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end">
        <Button
          form="register-form"
          disabled={isRegisterPending}
          className="w-[150px]"
        >
          {!isRegisterPending ? (
            "Daftarkan"
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Mendaftarkan...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
