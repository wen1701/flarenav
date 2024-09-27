import { useState } from 'react';

export default function AdminDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`${isMenuOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out bg-gray-800 text-white`}>
                <div className="p-4">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-full text-left"
                    >
                        {isMenuOpen ? (
                            <span>&#x2190; 收起</span>
                        ) : (
                            <span>&#x2192;</span>
                        )}
                    </button>
                </div>
                <nav className={`${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
                    <ul className="space-y-2">
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">菜单项1</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">菜单项2</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">菜单项3</li>
                    </ul>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-10">
                <h1 className="text-3xl font-bold mb-4">管理仪表板</h1>
                {/* 这里放置仪表板的主要内容 */}
            </div>
        </div>
    )
}