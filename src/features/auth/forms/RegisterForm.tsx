import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "../schemas";
import type { RegisterFormSchema } from "../types";
import { RegisterFormInner } from "./RegisterFormInner";
import { api } from "@/utils";
import { toast as sonner } from "sonner";
import { useToast } from "@/hooks";

export const RegisterForm = () => {
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

  const onSubmit = (values: RegisterFormSchema) => register(values);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Silahkan buat akun untuk memulai</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <RegisterFormInner formId="register-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end">
        <Button form="register-form" disabled={isRegisterPending}>
          {!isRegisterPending ? (
            "Register"
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Registering...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
