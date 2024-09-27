import { useLoaderData } from "@remix-run/react";
import { loader as rootLoader } from "~/root";
interface CartProps {
  id: string;
  name:string;
  imgSrc: string;
  title?: string;
  link?: string;
  shortDescription?: string;
  keyWorks?: string;
  description?: string;
}

export default function Card(props: CartProps) {
  const data = useLoaderData<typeof rootLoader>();
  return (
    <a href={`${props.link||'#'}?utm_source=${data.baseinfo.host}`} className="group relative block h-56" target="_blank" rel="nofollow" >
      <div className="relative flex h-full transform flex-col rounded-lg border-2 border-black bg-white transition-transform group-hover:-translate-y-1">
        <div className="flex-col justify-start p-6 transition-opacity text-gray-900">
          <div className="flex grow items-center">
            <img
              width={50}
              height={50}
              className="mr-2 flex-shrink-0 rounded-sm"
              alt={`${props.id} icon`}
              //src={props.imgSrc}
              src={`https://img.purrtides.com/tools/${props.id}/favicon.ico`}
            />

            <h2 className="grow text-lg 2xl:text-2xl text-gray-900">{props.name}</h2>
          </div>
          <div className="mt-2 line-clamp-5">
            <p>{props.description}</p>
          </div>
        </div>

        {/* <div className="absolute flex flex-col p-4 opacity-0 group-hover:relative group-hover:opacity-100">
          <h3 className="text-xl font-medium sm:text-2xl">{props.title}</h3>
          <p className="grow text-sm sm:text-base">{props.description}</p>
          <p className="mt-4 shrink-0 font-bold">Read more</p>
        </div> */}
      </div>
    </a>
  );
}
