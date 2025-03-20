"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function loginWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // Asegúrate de que esta URL esté permitida en la configuración de redirecciones de Supabase
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/confirmation`,
    },
  });

  console.log("data:", data);
  if (error) {
    console.error("Error al iniciar sesión:", error);
    throw new Error(error.message);
  }

  // Si Supabase retorna una URL, redirige manualmente
  if (data?.url) {
    redirect(data.url);
  }
}

export async function getToken() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  return data;
}
