import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bbsrjwqszuovelevcuqz.supabase.co'
const supabaseKey = 'sb_publishable_MsWMFPCRjKwwPsAkrh1dJw_9b_eff8h'

export const supabase = createClient(supabaseUrl, supabaseKey)