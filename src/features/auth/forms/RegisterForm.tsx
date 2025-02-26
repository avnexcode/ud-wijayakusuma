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

export const RegisterForm = () => {
  const form = useForm<RegisterFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = (values: RegisterFormSchema) => console.log(values);

  const isRegisterPending = false;

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
