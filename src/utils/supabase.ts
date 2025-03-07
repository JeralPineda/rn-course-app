import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vxbfhahncfsewvpamtip.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4YmZoYWhuY2ZzZXd2cGFtdGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMDQ3MDEsImV4cCI6MjA1Njg4MDcwMX0.HXR7H4DkMlW2wL-XWe0URHp5t1sDWOjIfBOdPuKcJbY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {});
