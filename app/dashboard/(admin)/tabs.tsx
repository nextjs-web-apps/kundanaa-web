'use client'

import { useRouter, useSearchParams } from "next/navigation"

interface TabsInfo {
    id: string
    label: string
    content: React.ReactNode
}

const Tabs = ({ tabs }: { tabs: TabsInfo[] }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeTab = searchParams.get('tab') || tabs[0].id

    const handleTabChange = (tabId: string) => {
        router.push(`?tab=${tabId}`)
    }
    return (
        <div>
            <nav className="flex gap-2">
                {tabs.map((tab) => (
                    <button key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`${activeTab === tab.id
                            ? 'border-b-2 border-blue-500 font-semibold'
                            : 'text-gray-500'}
                            px-4 py-2 cursor-pointer`}
                    >{tab.label}</button>
                ))}
            </nav>
            <div>
                {tabs.find(t => t.id === activeTab)?.content}
            </div>
        </div>
    )
}

export default Tabs