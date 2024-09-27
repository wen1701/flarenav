// app/utils/supabase.server.ts
import { createClient } from '@supabase/supabase-js';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import { LoaderFunctionArgs } from '@remix-run/node';

export const supabaseClient = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// 创建 Supabase 客户端const headers = new Headers();
export function createServerSupabaseClient(request: LoaderFunctionArgs['request']) {
   const headers = new Headers();
   const supabaseServerClient = createServerClient(process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '')
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
              headers.append('Set-Cookie', serializeCookieHeader(name, value, options));
            }
          );
        },
      },
    });

    return {
      supabase: supabaseServerClient,
      headers: headers
   }
}
