import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { loadJsonData } from "~/utils/data";

export const loader = async() =>{
    const data = await loadJsonData(["data","baseinfo.json"]);
    return json({data});
}
export default function Pricing() {
    const {data} = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex justify-center items-center">
        <div className="rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:px-20 lg:py-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Sumbit Plan
            </h2>

            <p className="mt-2 sm:mt-4 text-gray-900">
              <strong className="text-3xl font-bold sm:text-4xl line-through italic">
                {" "}
                $ 19.9
                {" "}
              </strong>

              <span className="text-sm font-medium text-gray-700">/month</span>
            </p>
            <p className="mt-2 sm:mt-4 ">

            <strong className="text-3xl font-bold text-gray-900 sm:text-4xl italic">
            {" "}
            $ 0
            {" "}
            </strong>

            <span className="text-sm font-medium text-gray-700">/now</span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Unlimited Submit </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Cancel Anytime  </span>
            </li>

            
          </ul>

          <a
            href={`mailto:${data.support.email}`}
            className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
