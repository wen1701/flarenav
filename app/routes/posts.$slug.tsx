import { getPostData } from '~/utils/articles';
import { Link } from 'lucide-react';

import i18next from '~/i18next.server';
import {ArrowLeft, ChevronRight} from 'lucide-react';
import { json, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import invariant from "tiny-invariant";
import { useTranslation } from 'react-i18next';
export const loader = async({
    params,
    request
}:LoaderFunctionArgs)=>{
    invariant(params.slug, 'expected params.slug');
    const postData = await getPostData(params.slug);
    const locale =  i18next.getLocale(request);
    return json({locale,postData});
}
export async function generateMetadata({params}: { params: { slug: string } }) {
    const postData = await getPostData(params.slug);
    return {
        title: `${postData.title} | FlareAIX.com`,
        description: postData.description || `Read about ${postData.title} on Answer Quickly`,
    };
}

export default function Post() {
    const {locale,postData} = useLoaderData<typeof loader>();
    const {t} = useTranslation();
    return (
        <article className="container max-w-screen-xl xl:max-w-screen-lg 2xl:max-w-screen-2xl mx-auto px-4 py-6">
            {/* Breadcrumb navigation */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
                <a href="/" className="hover:text-blue-600 ">Home</a>
                <ChevronRight className="mx-2" size={16}/>
                <span className="text-gray-900">title</span>
            </nav>
            <section className='item-center'>
                <div className="flex flex-col space-y-4 space-y-reverse justify-center items-center">
                  <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl mb-6">FlareaiX.com</h1>
                  <h2 className="text-lg text-gray-600 mt-6">All-in-one visual design platform containing AI photo and video editing tools. Automatic process for background remove, image restoration, graphic design, and content generation. With Cutout.Pro, it is one click away to optimize your content and transform your design ideas into special asset effectively.</h2>
                  <a className="flex justify-center items-center rounded-md border border-indigo-600 bg-indigo-600 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring px-4 py-3 text-md font-semibold text-white shadow-sm" target="_blank" rel="dofollow" href="https://www.blaze.ai/?utm_source=woy.ai">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clipRule="evenodd"/>
                    </svg>
                    &nbsp;Open Blaze Designer
                  </a>
                </div>
                <div className="w-[90%] md:max-w-5xl mx-auto flex justify-center items-center mb-12">
                    <img width="800" src="https://s.woy.ai/banner/65a24eff-8f35-45c9-8af3-d84e3067cf4f.jpg" className="border rounded-lg shadow-lg" alt="woy.ai"/>
                    </div>
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: postData.mdHtmlText }}
                    >

                </div>
            </section>

            {/* Back to articles link */}

        </article>
    );
}
