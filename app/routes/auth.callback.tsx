import { redirect } from '@remix-run/node'
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'


import type { LoaderFunctionArgs } from '@remix-run/node'
import { createServerSupabaseClient } from '~/utils/supabase.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (code) {
    const {supabase, headers} = createServerSupabaseClient(request);

    const {data, error} = await supabase.auth.exchangeCodeForSession(code);
    console.log("auth.callback data =>",data);
    console.log("auth.callback error =>",error);
    
    return redirect("/",{
      headers:headers
    });
  }

  return redirect('/')
}