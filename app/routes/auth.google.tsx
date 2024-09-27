// app/routes/auth/google.tsx
import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { createServerSupabaseClient } from '~/utils/supabase.server';

export const loader = async ({ 
  params,
  request,
  context
}:LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const {supabase, headers} = createServerSupabaseClient(request);

  // 获取 Supabase 登录 URL
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${url.origin}/auth/callback`,
    },
  });
  if (error) {
    console.error('Error during Google sign-in:', error);
    return redirect('/?error=auth_error');
  }

  return redirect(data.url,{
    headers:headers
  });
};
