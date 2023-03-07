import { createClient } from '@supabase/supabase-js'

const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
// process.env.NEXT_PUBLIC_SUPABASE_URL,
// process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY