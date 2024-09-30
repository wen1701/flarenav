import { useLoaderData,useSubmit,useNavigate } from "@remix-run/react";
import type { loader as rootLoader } from "~/root";
import { useTranslation } from "react-i18next";

export default function Header() {
    const data = useLoaderData<typeof rootLoader>();
    const {t} = useTranslation();
    const submit = useSubmit();
    const navigate = useNavigate();
    const handleLogout = () => {
        submit(null, { method: "post",action: "/auth/signout" });
    };
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = event.target.value;
        console.log("lang:", lang);
        navigate(`?lang=${lang}`);
    };
    return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-screen-xl xl:max-w-screen-lg 2xl:max-w-screen-2xl px-4 relative flex h-16 items-center justify-between gap-4 sm:gap-8">
            <div className="flex items-center gap-4">
                <a href="/">
                    <div className="inline-flex gap-1.5 text-lg 2xl:text-2xl">
                        <span className="font-medium text-gray-900">{t("header.home")}</span>
                        <span aria-hidden="true" role="img">🚀</span>
                    </div>
                </a>
                <nav className="hidden md:block">
                    <ul className="gap-4 flex text-lg">
                        <li key={t("menus.pricing")}>
                            <a className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:opacity-75" href="/pricing">{t("menus.pricing")}</a>
                        </li>
                        <li key={t("menus.submit")}>
                            <a className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:opacity-75" href="/submit">{t("menus.submit")}</a>
                        </li>

                    </ul>
                </nav>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
                <div className="relative flex h-16 max-w-[300px] flex-1 items-center">
                    <form role="search" className="flex-1">

                    </form>
                </div>
                {
                    data.baseinfo ? (
                        <select
                            onChange={handleLanguageChange}
                            value={data.locale_search || data.locale_cookie || 'en'}
                            className="text-sm text-gray-700 border-gray-300 rounded-md px-4 py-2 border bg-white"
                        >
                            {Object.entries(data.baseinfo.languages).map((item:any) => (
                                <option key={item[0]} value={item[0]}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                    ) : null
                }

                {data.user ? (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">
                        
                        <img
                            width={30}
                            height={30}
                            className="mr-2 flex-shrink-0 rounded-full"
                            alt={`${data.user.email} icon`}
                            src={data.user.user_metadata.avatar_url}
                            />
                    </span>
                    <button onClick={handleLogout}
                        className="text-sm text-gray-700 hover:text-gray-900"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="border bg-white shadow-sm">
                    <a href="/auth/google" className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                        Sign in
                    </a>
                </div>
            )}
                
                <div className="flex items-center md:hidden">
                    <button className="text-gray-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        <span className="sr-only">Toggle menu</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
)}