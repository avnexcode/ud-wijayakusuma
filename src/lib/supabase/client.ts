import { env } from "@/configs/env";
import { createBrowserClient } from "@supabase/ssr";
import { createClient as createDefaultClient } from "@supabase/supabase-js";

export const createClient = () => {
  const supabase = createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return supabase;
};

export const supabaseDefaultClient = createDefaultClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const supabase = createClient();
