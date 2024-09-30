import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import i18next from "~/i18next.server";
import { getPrivacypolicy } from "~/utils/data";

export const loader = async({
    request
}:LoaderFunctionArgs) =>{
    let locale = await i18next.getLocale(request);
    console.log("locale",locale);
    const data = await getPrivacypolicy(locale);
    console.log("data",data);
    return json({data});
}
export default function About(){
    const {data} = useLoaderData<typeof loader>();
    return (
        <div className="mx-auto max-w-screen-xl xl:max-w-screen-lg 2xl:max-w-screen-2xl px-4 pb-8 lg:pb-12 mt-12">
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.mdHtmlText }}
                    >

                </div>
        </div>
    )
}