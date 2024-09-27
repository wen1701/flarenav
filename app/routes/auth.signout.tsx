// app/routes/auth/google.tsx
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { createServerSupabaseClient } from '~/utils/supabase.server';

export const action = async ({ 
  params,
  request,
  context
}:ActionFunctionArgs) => {
  const url = new URL(request.url);
  const {supabase, headers} = createServerSupabaseClient(request);

  // 获取 Supabase 登录 URL
  await supabase.auth.signOut();

  return redirect('/');
};
