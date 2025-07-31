import { createClient } from '@supabase/supabase-js'
import { SUPABASE_ANON_KEY } from 'astro:env/client'
import { SUPABASE_URL } from 'astro:env/client'

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
