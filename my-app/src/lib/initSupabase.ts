import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

//step-1-creating a supabase client
export const supabase = createClient (supabaseUrl, supabaseAnonKey);

//step-2-creating auth Admin Access Client and change the .env.local to mv src/app/.env.local ./ to change the directory from src/app to app
const service_role_key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_SECRET!;
const supabaseWithAdminRole = createClient (supabaseUrl, service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Access auth admin api
export const adminAuthClient = supabaseWithAdminRole.auth.admin;