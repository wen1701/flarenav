import { LoaderFunctionArgs } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { loader as rootLoader } from "~/root";

export default function Footer(){
    const {t} = useTranslation();
    const data = useLoaderData<typeof rootLoader>();
    return(
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
                <div className="flex justify-between">
                    <div className="flex flex-col  justify-between">

                    
                    <a href="/">
                        <div className="inline-flex gap-1.5 text-lg">
                            <span className="font-medium text-gray-900">{t("footer.name")}</span>
                            <span aria-hidden="true" role="img">🚀</span>
                        </div>
                    </a>
                    <div className="mt-6">
                        <p className="max-w-md text-pretty leading-relaxed text-gray-700">{t("footer.description")}</p>
                        <div className="mt-4 lg:flex lg:items-end lg:justify-between">
                            <p>{data.baseinfo.copyright}</p>

                        </div>
                    </div>
                    </div>
                    <div className="flex flex-col mt-4">
                        {
                            data.baseinfo.friends.map((item:any)=>{
                                return(
                                <a key={item.name} href={`${item.url}?utm_source=${data.baseinfo.host}`} className="mt-2 block text-sm font-medium text-gray-900 hover:opacity-75">{item.name}</a>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col">
                        <p className="font-medium text-gray-900">{t("menus.support")}</p>
                        <p className="mt-2 text-sm text-gray-700">{data.baseinfo.support.email}</p>
                        <a href="/privacypolicy" className="mt-2 block text-sm font-medium text-gray-900 hover:opacity-75">{t("menus.privacyPolicy")}</a>
                    </div>
                </div>
            </div>
        </footer>
)}