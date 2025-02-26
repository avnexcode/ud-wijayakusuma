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
import { SupabaseAuthErrorCode } from "@/utils";
import type { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values: LoginFormSchema) => {
    try {
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;
      toast.success("Login berhasil!");
      void router.replace("/dashboard");
    } catch (error) {
      switch ((error as AuthError).code) {
        case SupabaseAuthErrorCode.invalid_credentials:
          toast.error("Email atau password salah. Silakan coba lagi");
          break;
        case SupabaseAuthErrorCode.email_not_confirmed:
          form.setError("email", {
            message:
              "Email Anda belum diverifikasi. Silakan periksa kotak masuk Anda untuk tautan verifikasi.",
          });
          break;
        default:
          toast.error(
            "Terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.",
          );
      }
    }
  };

  const isLoginPending = form.formState.isSubmitting;

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
