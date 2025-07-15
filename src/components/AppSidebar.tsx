import { NavLink, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Users,
  UserPlus,
  BarChart3,
  Home,
  Menu,
  Building2,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { OrganizationSwitcher } from "./OrganizationSwitcher";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    roles: ["super_admin", "org_user", "end_user"],
  },
  {
    title: "Student Directory",
    url: "/students",
    icon: Users,
    roles: ["super_admin", "org_user"],
  },
  {
    title: "Add Student",
    url: "/add-student",
    icon: UserPlus,
    roles: ["super_admin", "org_user"],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    roles: ["super_admin", "org_user"],
  },
  {
    title: "Organization",
    url: "/organization",
    icon: Building2,
    roles: ["super_admin", "org_user"],
  },
];

export function AppSidebar() {
  const { state, setOpenMobile, openMobile } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed";

  // Mock user role - will be replaced with real data from Supabase
  const userRole = "org_user";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/students") {
      return location.pathname === "/students";
    }
    return location.pathname === path;
  };

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const filteredNavigationItems = navigationItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <>
      {/* Mobile Menu Trigger - Only show on mobile */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open Menu</span>
        </Button>
      )}

      <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
              <GraduationCap className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">
                  Village SMS
                </h2>
                <p className="text-xs text-sidebar-foreground/70">
                  Student Management System
                </p>
              </div>
            )}
          </div>

          {/* Organization Switcher */}
          {!isCollapsed && (
            <div className="px-4 pb-4">
              <OrganizationSwitcher />
            </div>
          )}

          {!isMobile && <SidebarTrigger className="ml-auto mr-4 mb-2" />}
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredNavigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        onClick={handleNavClick}
                        className={({ isActive: navIsActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                            isActive(item.url) || navIsActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm"
                              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
