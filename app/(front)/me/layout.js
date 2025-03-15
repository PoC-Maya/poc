import { TouristSideNav } from "@/components/tourist-side-nav"

export default function TouristDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
          <TouristSideNav className="p-4" />
        </aside>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

