import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
  useRouteLoaderData,
} from "@remix-run/react";
import type { LinksFunction} from "@remix-run/node";
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import i18next from "./i18next.server";
import { json } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import { loadJsonData } from "~/utils/data";
import Header from "./components/Header";
import TopSession from "./components/TopSession";
import Content from "./components/Content";
import Footer from "./components/Footer";

import styles from "./tailwind.css?url";

import {
  createServerClient,
  serializeCookieHeader,
  parseCookieHeader,
} from "@supabase/ssr";
import { createServerSupabaseClient } from "./utils/supabase.server";
export const loader = async({
  params,
  request
}:LoaderFunctionArgs)=>{
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
  const langCookie = cookies.find(cookie => cookie.name === "lang");
  const cookie_lang = langCookie ? langCookie.value : null;

  let locale = lang || cookie_lang || await i18next.getLocale(request);
  const {supabase, headers} = createServerSupabaseClient(request);
  const userResponse = await supabase.auth.getUser();
  const user = userResponse?.data.user ?? null;
  
  headers.append('Set-Cookie', `lang=${locale}; Path=/; HttpOnly; SameSite=Lax`);
  const baseinfo = await loadJsonData(["data","baseinfo.json"]);
  return json(
    {
      locale, 
      user,
      baseinfo
    },
    {
      headers: headers
    }
  );
}
export let handel = {
  i18n: "common",
};

export const links: LinksFunction = () => [
  {
    rel:"stylesheet",
    href: styles
  },
  { 
    rel: "preconnect", 
    href: "https://fonts.googleapis.com" 
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  }
];


export function Layout({ children }: { children: React.ReactNode }) {
    let { locale, user, baseinfo} = useLoaderData<typeof loader>();
    let { i18n } = useTranslation();
    useChangeLanguage(locale);

    const matches = useMatches();
    const isAdminRoute = matches.find((match)=>match.id.startsWith("routes/admin"));

    return (
      <html lang={`${locale}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className="flex flex-col min-h-screen">
        {isAdminRoute ? (
          children
        ) : (
          <>
            <Header/>
            <TopSession/>
            <Content>
              {children}
            </Content>
            <Footer/>
          </>
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
