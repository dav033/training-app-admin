"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { loginWithGoogle } from "./actions";

export default function LoginPage() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Indicar que el componente se ha montado (solo en el cliente)
    setMounted(true);

    // Obtener la sesión inicial
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

    // Suscribirse a cambios de autenticación
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

  // Mientras el componente no esté montado, renderizamos un placeholder
  if (!mounted) {
    return <div>Cargando...</div>;
  }

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
