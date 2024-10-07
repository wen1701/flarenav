import { group } from "console";
import Card from "./Card";

interface NavCardItem {
    id:string;
    name:string;
    title: string;
    description: string;
    icon: string;
    url: string;
    ori_url:string;
}

interface NavCardGroup {
    group_name: string;
    details: NavCardItem[];
}

interface NavCardProps {
    data: NavCardGroup[];
}


export default function NavCards({data}:NavCardProps){

    return <>
        <ul className="space-y-8">
            {
                data.map((group, index) => (

                    <li key={index} className="space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">{group.group_name}</h2>
                        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-4">
                            {
                                group.details.map((item, idx) => (
                                    <Card 
                                        id={item.id}
                                        name={item.name}
                                        key={idx}
                                        title={item.title}
                                        imgSrc={item.icon}
                                        shortDescription={item.description}
                                        description={item.description}
                                        url={`/posts/${item.id}`}
                                        ori_url={item.ori_url}
                                    />
                                ))
                            }
                        </ul>
                    </li>
                ))
            }
        </ul>
    </>
}