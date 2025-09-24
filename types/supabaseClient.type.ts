import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.type";

export type SupabaseClientType = SupabaseClient<Database>