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
import { getBaseInfo, getPosts } from "~/utils/data";

import Header from "./components/Header";
import TopSession from "./components/TopSession";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import styles from "./tailwind.css?url";
import i18n from "./i18n";

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
  const langCookie = cookies.find(cookie => cookie.name === "i18next");
  const cookie_lang = langCookie ? langCookie.value : null;

  let locale = lang || cookie_lang || await i18next.getLocale(request);
  let locale_cookie = cookie_lang;
  let locale_i18next = await i18next.getLocale(request);
  let locale_search = url.searchParams.get("lang");

  const {supabase, headers} = createServerSupabaseClient(request);
  const userResponse = await supabase.auth.getUser();
  const user = userResponse?.data.user ?? null;
  
  //headers.append('Set-Cookie', `lang=${locale}; Path=/; HttpOnly; SameSite=Lax`);
  const baseinfo = await getBaseInfo();
  return json(
    {
      locale, 
      user,
      baseinfo,
      locale_cookie,
      locale_i18next,
      locale_search
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
    let { locale, user, baseinfo, locale_cookie, locale_i18next, locale_search} = useLoaderData<typeof loader>();
    let { i18n, t } = useTranslation();
    const [showPrompt, setShowPrompt] = useState(false);
    const [detectedLanguage, setDetectedLanguage] = useState("");
    const matches = useMatches();
    const isAdminRoute = matches.find((match)=>match.id.startsWith("routes/admin"));
    console.log();
    console.log("locale_cookie:", locale_cookie);
    console.log("locale_i18next:", locale_i18next);
    console.log("locale_search:", locale_search);
    const lang = locale_search || locale_cookie || 'en';
    const navigate = useNavigate();
    useChangeLanguage(lang);

    useEffect(()=>{
      console.log("lang:", lang);
      console.log("locale:", locale);
      if(locale !== lang){
        setShowPrompt(true);
        setDetectedLanguage(locale);
      }
    },[locale,lang]);

    const handleLanguageSwitch = () => {
      console.log("detectedLanguage:", detectedLanguage);
      i18n.changeLanguage(detectedLanguage);
      navigate(`?lang=${detectedLanguage}`, { replace: true });
      document.cookie = `i18next=${detectedLanguage}; path=/; max-age=31536000`;
      setShowPrompt(false);
      console.log("lang:", lang);
    };

    return (
      <html lang={`${lang}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />        
        <Links />
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className="flex flex-col min-h-screen">
        {showPrompt && (
               <div className="z-10 w-96 fixed border border-gray-200 bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">              
               <h2 className="text-lg font-bold text-gray-900">Language Detected</h2>

              <p className="mt-2 text-sm text-gray-500">
                We detected that your browser language is <span className="font-bold text-gray-700">{baseinfo.languages[locale]}</span>. Would you like to switch to this language?
              </p>

              <div className="mt-4 flex gap-2">
                <button type="button" onClick={()=>{handleLanguageSwitch()}} className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                  Yes, I'm sure
                </button>

                <button type="button" onClick={()=>{setShowPrompt(false)}} className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                  No, go back
                </button>
              </div>
</div>

        )}

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
