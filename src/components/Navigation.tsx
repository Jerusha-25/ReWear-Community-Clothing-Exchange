import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { BreathingElement } from "@/components/BreathingElement";
import { Home, Search, User, Plus, Shield, LogOut } from "lucide-react";

export function Navigation() {
  const { user } = useAuth();
  const [location] = useLocation();
  const { toast } = useToast();

  const signOutMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("/api/auth/signout", {
        method: "POST",
      });
    },
    onSuccess: () => {
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully",
      });
      window.location.href = "/";
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/browse", icon: Search, label: "Browse" },
    { path: "/add-item", icon: Plus, label: "Add Item" },
    { path: "/dashboard", icon: User, label: "Dashboard" },
  ];

  if (user?.isAdmin) {
    navItems.push({ path: "/admin", icon: Shield, label: "Admin" });
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <BreathingElement>
              <div className="text-2xl font-bold text-white cursor-pointer">
                FashionSwap
              </div>
            </BreathingElement>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <BreathingElement delay={0.1}>
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                      isActive 
                        ? "bg-emerald-600 text-white" 
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}>
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                  </BreathingElement>
                </Link>
              );
            })}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-gray-300">
              <span>Welcome, {user?.firstName || user?.email || "User"}!</span>
              {user?.points !== undefined && (
                <BreathingElement>
                  <div className="bg-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {user.points} points
                  </div>
                </BreathingElement>
              )}
            </div>
            <BreathingElement>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </BreathingElement>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <BreathingElement delay={0.1}>
                  <div className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isActive 
                      ? "bg-emerald-600 text-white" 
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}>
                    <Icon size={20} />
                    <span className="text-xs mt-1">{item.label}</span>
                  </div>
                </BreathingElement>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}