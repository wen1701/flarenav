import { useLoaderData } from "@remix-run/react";
import { getBaseInfo } from "~/utils/data";
import { json } from "@remix-run/node";

export const loader = async() =>{
    const data = await getBaseInfo();
    return json({data});
}
export default function Sumbit(){
    const {data} = useLoaderData<typeof loader>();
    return (
        <div className="flex-grow flex items-center justify-center py-8">
            <div className="max-w-screen-xl mx-auto text-center">
                <div className="text-3xl font-bold text-gray-900">Coming soon ...</div>
                <div className="mt-6 text-xl text-gray-500">
                    <p>We will launch this feature soon</p>
                    <p>you can send the suggestion or site to <a href={`mailto:${data.support.email}`}
                            className="font-bold text-gray-900 hover:text-blue-600">{data.support.email}</a></p>
                </div>
            </div>
        </div>
    )
}