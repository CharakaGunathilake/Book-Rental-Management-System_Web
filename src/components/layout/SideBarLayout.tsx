import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/SideBar";
export default function SideBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-screen">
      <AppSidebar />
      <main className="w-full h-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
