
import { NavLink, useLocation } from "react-router-dom";
import { GraduationCap, Users, UserPlus, BarChart3, Home, Menu } from "lucide-react";
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

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Student Directory",
    url: "/students",
    icon: Users,
  },
  {
    title: "Add Student",
    url: "/add-student",
    icon: UserPlus,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const { state, setOpenMobile, openMobile } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed";

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
                <h2 className="text-lg font-bold text-sidebar-foreground">Village SMS</h2>
                <p className="text-xs text-sidebar-foreground/70">Student Management System</p>
              </div>
            )}
          </div>
          {!isMobile && <SidebarTrigger className="ml-auto mr-4 mb-2" />}
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
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
