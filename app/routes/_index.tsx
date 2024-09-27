import { json, type MetaFunction } from "@remix-run/node";
import NavCards from "~/components/NavCards";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { loadJsonData } from "~/utils/data";
export const meta: MetaFunction = () => {
  const {t} = useTranslation();

  return [
    { title: t("title") },
    { name: "description", content: t("description") },
  ];
};
export const loader = async() =>{
    // 获取 JSON 文件的路径
    const webInfoData = await loadJsonData(['data', 'web_info.json']);
    const baseinfo = await loadJsonData(['data', 'baseinfo.json']);
    return json({webInfoData,baseinfo});
}
export default function Index() {
  const data = useLoaderData<typeof loader>();
  const {t} = useTranslation();
  return (
    <>
      <section className="bg-white text-center">
          <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
              <div className="flex flex-col space-y-4 space-y-reverse">
                  <h1 className="order-last text-lg text-gray-500">{t("description")}</h1>
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-5xl">{t("h1")}</h2>
              </div>
              <div className="mt-4">
                  <div className="not-prose mx-auto max-w-lg text-center">
                      <div data-ea-publisher="hyperuidev" data-ea-type="image" data-ea-style="stickybox" className="bordered horizontal [&amp;_.ea-callout]:!mb-0 [&amp;_.ea-content]:!mx-0 [&amp;_.ea-content]:!mt-0 [&amp;_.ea-stickybox-hide]:hidden"></div>
                  </div>
              </div>
          </div>
      </section>
      <div id="mainContent" className="mx-auto max-w-screen-xl xl:max-w-screen-lg 2xl:max-w-screen-2xl px-4 pb-8 lg:pb-12">
        <NavCards data={data.webInfoData}/>
      </div>
    </>
  );
}

