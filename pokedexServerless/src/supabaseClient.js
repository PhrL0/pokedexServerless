
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rrcyijyygxoghbbqoxbk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyY3lpanl5Z3hvZ2hiYnFveGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxOTYzMDEsImV4cCI6MjA3Mjc3MjMwMX0.UrRjcxuv4vNix4fyrZpNorYWniLkf2Vf218tbX4tsDw'
export const supabase  = createClient(supabaseUrl, supabaseKey)