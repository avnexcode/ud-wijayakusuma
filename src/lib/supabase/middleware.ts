import { env } from "@/configs/env";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PATHS = {
  DEFAULT_REDIRECT: "/",
  AUTH_REDIRECT: "/login",
  PUBLIC_ROUTES: ["/login", "/register"],
};

export const updateSession = async (
  request: NextRequest,
  protectedRoutes: string[],
) => {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublicRoute = PATHS.PUBLIC_ROUTES.includes(request.nextUrl.pathname);

  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (user && isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = PATHS.DEFAULT_REDIRECT;
    return NextResponse.redirect(url);
  }

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = PATHS.AUTH_REDIRECT;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};
