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
import { useForm } from "react-hook-form";
import { loginFormSchema } from "../schemas";
import type { LoginFormSchema } from "../types";
import { LoginFormInner } from "./LoginFormInner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const LoginForm = () => {
  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (values: LoginFormSchema) => console.log(values);

  const isLoginPending = false;

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Silahkan login untuk melanjutkan</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <LoginFormInner formId="login-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end">
        <Button form="login-form" disabled={isLoginPending}>
          {!isLoginPending ? (
            "Login"
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Loging in...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
