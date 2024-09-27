import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { loadJsonData } from "~/utils/data";
import { LoaderFunctionArgs } from "@remix-run/node";
import i18next from "~/i18next.server";
import { loadMarkdownData } from "~/utils/data";
export const loader = async({
    request
}:LoaderFunctionArgs) =>{
    let locale = await i18next.getLocale(request);
    const data = await loadMarkdownData(["data","privacypolicy",`${locale}.md`]);
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