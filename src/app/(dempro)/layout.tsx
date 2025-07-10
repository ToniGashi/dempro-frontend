import { cookies } from "next/headers";

import { AuthProvider } from "@/hooks/use-auth";
import { getServerUser } from "@/lib/api-helpers";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavBar from "@/components/nav-bar";
// import Footer from "@/components/footer";

export default async function Layout(props: { children: React.ReactNode }) {
  const [cookieStore] = await Promise.all([cookies()]);
  const { user } = await getServerUser();

  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  return (
    <div className="flex flex-col relative">
      <AuthProvider userData={user}>
        <NavBar />
        <SidebarProvider defaultOpen={!isCollapsed} className="mt-17">
          <AppSidebar className="pt-24 bg-dpro-secondary" />
          <SidebarInset>{props.children}</SidebarInset>
        </SidebarProvider>
        {/* <Footer /> */}
      </AuthProvider>
    </div>
  );
}
