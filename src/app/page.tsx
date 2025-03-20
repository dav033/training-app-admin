"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { loginWithGoogle } from "./actions";

export default function LoginPage() {
  const [session, setSession] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    // Obtener la sesión actual al montar el componente
    const obtenerSesionInicial = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al obtener la sesión inicial:", error);
      } else {
        setSession(session);
      }
    };

    obtenerSesionInicial();

    // Suscribirse a los cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Limpiar la suscripción al desmontar el componente
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div>
      <h1>Página de Login</h1>
      <button onClick={() => loginWithGoogle()}>Login con Google</button>

      {session ? (
        <div>
          <h2>Información de la sesión:</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <p>No hay sesión activa.</p>
      )}
    </div>
  );
}
