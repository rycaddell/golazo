import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://torbscympnmnsigtinib.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)

