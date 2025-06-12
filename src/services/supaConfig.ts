import { createClient } from '@supabase/supabase-js';

const VITE_SUPABASE_URL = "https://icabjgwodrysbrwrraxg.supabase.co"
const VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljYWJqZ3dvZHJ5c2Jyd3JyYXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODAyNzMsImV4cCI6MjA2MzQ1NjI3M30.580CcYX4GCffjdRZgRy1xs4Hz-69zY-Zvj9TjPxtn90"

const supabaseUrl = VITE_SUPABASE_URL;
const supabaseKey = VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase 