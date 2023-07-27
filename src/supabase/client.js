import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const viteKey = import.meta.env.VITE_TMDB_KEY;

//from quickstart guide: https://supabase.com/docs/guides/auth/quickstarts/react
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
