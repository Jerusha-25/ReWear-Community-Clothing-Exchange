import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { BreathingElement } from "@/components/BreathingElement";
import { ScrollReveal } from "@/components/ScrollReveal";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Users, Package, ArrowRightLeft, Shield, Settings, Eye, Ban } from "lucide-react";

export default function AdminPanel() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("users");

  // Redirect if not admin
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-6 text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-semibold mb-4">Access Denied</h1>
            <p className="text-gray-400">You don't have permission to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["/api/users"],
  });

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["/api/items"],
  });

  const { data: exchanges = [], isLoading: exchangesLoading } = useQuery({
    queryKey: ["/api/exchanges"],
  });

  const updateExchangeMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) =>
      apiRequest(`/api/exchanges/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      toast({
        title: "Exchange Updated",
        description: "Exchange status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/exchanges"] });
    },
  });

  const tabs = [
    { id: "users", label: "Manage Users", icon: Users },
    { id: "items", label: "Manage Listings", icon: Package },
    { id: "exchanges", label: "Manage Orders", icon: ArrowRightLeft },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Header */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <BreathingElement>
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Shield className="text-emerald-400" size={48} />
                  <h1 className="text-4xl md:text-6xl font-bold">
                    Admin Panel
                  </h1>
                </div>
              </BreathingElement>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Manage users, listings, and exchanges across the platform
              </p>
            </div>
          </ScrollReveal>

          {/* Tab Navigation */}
          <ScrollReveal delay={0.3}>
            <div className="flex justify-center mb-8">
              <div className="bg-gray-900 p-2 rounded-2xl border border-gray-800">
                <div className="flex space-x-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                          activeTab === tab.id
                            ? "bg-emerald-600 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="hidden md:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Users Tab */}
        {activeTab === "users" && (
          <ScrollReveal>
            <div>
              <h2 className="text-3xl font-bold mb-8">Manage Users</h2>
              
              {usersLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded-2xl animate-pulse">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-800 rounded w-1/4 mb-2"></div>
                          <div className="h-3 bg-gray-800 rounded w-1/3"></div>
                        </div>
                        <div className="h-8 bg-gray-800 rounded w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {users.map((userData: any, index: number) => (
                    <ScrollReveal key={userData.id} delay={index * 0.1}>
                      <BreathingElement delay={index * 0.1}>
                        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                                {userData.profileImageUrl ? (
                                  <img 
                                    src={userData.profileImageUrl}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                ) : (
                                  <span className="font-bold">
                                    {userData.firstName?.[0] || userData.email?.[0] || "U"}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold">
                                  {userData.firstName || userData.email}
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  {userData.email}
                                </p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-emerald-400 text-sm">
                                    {userData.points || 0} points
                                  </span>
                                  {userData.isAdmin && (
                                    <span className="bg-purple-600 px-2 py-1 rounded text-xs">
                                      Admin
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors">
                                <Eye size={16} />
                                <span className="hidden sm:inline">View</span>
                              </button>
                              <button className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors">
                                <Ban size={16} />
                                <span className="hidden sm:inline">Action</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </BreathingElement>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Items Tab */}
        {activeTab === "items" && (
          <ScrollReveal>
            <div>
              <h2 className="text-3xl font-bold mb-8">Manage Listings</h2>
              
              {itemsLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-900 rounded-2xl overflow-hidden animate-pulse">
                      <div className="h-48 bg-gray-800"></div>
                      <div className="p-4">
                        <div className="h-4 bg-gray-800 rounded mb-2"></div>
                        <div className="h-3 bg-gray-800 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item: any, index: number) => (
                    <ScrollReveal key={item.id} delay={index * 0.1}>
                      <BreathingElement delay={index * 0.1}>
                        <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                          <div className="relative h-48 bg-gray-800">
                            {item.images?.[0] ? (
                              <img 
                                src={item.images[0]}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <span className="text-3xl">📷</span>
                              </div>
                            )}
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                              item.isAvailable 
                                ? "bg-emerald-600 text-white" 
                                : "bg-gray-600 text-gray-300"
                            }`}>
                              {item.isAvailable ? "Available" : "Unavailable"}
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold mb-2 truncate">{item.title}</h4>
                            <p className="text-gray-400 text-sm truncate">{item.description}</p>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-emerald-400 text-sm">
                                {item.condition}
                              </span>
                              <div className="flex space-x-2">
                                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs transition-colors">
                                  View
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs transition-colors">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </BreathingElement>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Exchanges Tab */}
        {activeTab === "exchanges" && (
          <ScrollReveal>
            <div>
              <h2 className="text-3xl font-bold mb-8">Manage Orders</h2>
              
              {exchangesLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded-2xl animate-pulse">
                      <div className="h-4 bg-gray-800 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {exchanges.map((exchange: any, index: number) => (
                    <ScrollReveal key={exchange.id} delay={index * 0.1}>
                      <BreathingElement delay={index * 0.1}>
                        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold mb-2">
                                Exchange #{exchange.id.slice(0, 8)}
                              </h4>
                              <p className="text-gray-400 text-sm mb-2">
                                Status: <span className={`font-semibold ${
                                  exchange.status === 'completed' ? 'text-emerald-400' :
                                  exchange.status === 'pending' ? 'text-yellow-400' :
                                  'text-red-400'
                                }`}>{exchange.status}</span>
                              </p>
                              <p className="text-gray-500 text-sm">
                                Points: {exchange.pointsAwarded || 10}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => updateExchangeMutation.mutate({
                                  id: exchange.id,
                                  status: "completed"
                                })}
                                disabled={exchange.status === "completed"}
                                className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => updateExchangeMutation.mutate({
                                  id: exchange.id,
                                  status: "rejected"
                                })}
                                disabled={exchange.status === "rejected"}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      </BreathingElement>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}