// lib/supabaseClient.ts
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Creamos y exportamos una única instancia (singleton) para el navegador.
const createClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey);

export { createClient };
