"use server";
import { createClient } from "@/lib/supabase/server";
export async function login() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://cnnevzbpvjeogwojchej.supabase.co/auth/v1/callback",
    },
  });

  if (error) {
    console.error("Error iniciando sesión:", error);
  } else {
    console.log("Respuesta de signInWithOAuth:", data);
    // Nota: En muchos casos, al usar OAuth se redirige al usuario y la sesión se recupera después.
  }
}

export async function getToken() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  console.log("Sesión actual3333:", data);
  return data;
}
