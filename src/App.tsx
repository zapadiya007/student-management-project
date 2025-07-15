import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentProfile from "./pages/StudentProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/student-management-project/">
          <Routes>
            {/* Authentication Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes with Sidebar */}
            <Route
              path="/*"
              element={
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background">
                    <AppSidebar />
                    <main
                      className={`flex-1 overflow-auto ${
                        isMobile ? "pt-16 pl-4" : ""
                      }`}
                    >
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/students" element={<StudentList />} />
                        <Route path="/add-student" element={<AddStudent />} />
                        <Route
                          path="/edit-student/:id"
                          element={<EditStudent />}
                        />
                        <Route
                          path="/student/:id"
                          element={<StudentProfile />}
                        />
                        <Route path="/analytics" element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </SidebarProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
