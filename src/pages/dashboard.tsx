import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { BreathingElement } from "@/components/BreathingElement";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Plus, Package, ArrowRightLeft, Award } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: userItems = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["/api/users", user?.id, "items"],
    enabled: !!user?.id,
  });

  const { data: userExchanges = [], isLoading: exchangesLoading } = useQuery({
    queryKey: ["/api/users", user?.id, "exchanges"],
    enabled: !!user?.id,
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Header */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <BreathingElement>
                  <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center">
                    {user?.profileImageUrl ? (
                      <img 
                        src={user.profileImageUrl} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold">
                        {user?.firstName?.[0] || user?.email?.[0] || "U"}
                      </span>
                    )}
                  </div>
                </BreathingElement>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {user?.firstName ? `${user.firstName}'s Dashboard` : "Your Dashboard"}
                  </h1>
                  <p className="text-xl text-gray-400">
                    Manage your listings and track your swaps
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <BreathingElement>
                  <div className="bg-emerald-600 px-6 py-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Award size={24} />
                      <div>
                        <div className="text-2xl font-bold">{user?.points || 0}</div>
                        <div className="text-sm opacity-90">Points Earned</div>
                      </div>
                    </div>
                  </div>
                </BreathingElement>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Cards */}
          <ScrollReveal delay={0.3}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { 
                  title: "Active Listings", 
                  value: userItems.filter((item: any) => item.isAvailable).length,
                  icon: Package,
                  color: "emerald"
                },
                { 
                  title: "Total Items", 
                  value: userItems.length,
                  icon: Package,
                  color: "blue"
                },
                { 
                  title: "Completed Swaps", 
                  value: userExchanges.filter((ex: any) => ex.status === "completed").length,
                  icon: ArrowRightLeft,
                  color: "purple"
                },
                { 
                  title: "Points Earned", 
                  value: user?.points || 0,
                  icon: Award,
                  color: "emerald"
                }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <BreathingElement key={stat.title} delay={index * 0.1}>
                    <div className={`bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-${stat.color}-500 transition-all duration-300`}>
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`text-${stat.color}-400`} size={24} />
                        <span className={`text-3xl font-bold text-${stat.color}-400`}>
                          {stat.value}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-300">{stat.title}</h3>
                    </div>
                  </BreathingElement>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* My Listings Section */}
      <div className="container mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">My Listings</h2>
            <Link href="/add-item">
              <BreathingElement>
                <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  <Plus size={20} />
                  <span>Add New Item</span>
                </button>
              </BreathingElement>
            </Link>
          </div>
        </ScrollReveal>

        {itemsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-800"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : userItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userItems.map((item: any, index: number) => (
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <BreathingElement delay={index * 0.1}>
                  <Link href={`/items/${item.id}`}>
                    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500 transition-all duration-300 cursor-pointer hover:scale-105">
                      <div className="relative h-48 bg-gray-800">
                        {item.images && item.images[0] ? (
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
                      </div>
                    </div>
                  </Link>
                </BreathingElement>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <div className="text-center py-16 bg-gray-900 rounded-2xl">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-semibold mb-4">No items listed yet</h3>
              <p className="text-gray-400 mb-8">Start sharing your pre-loved items with the community!</p>
              <Link href="/add-item">
                <BreathingElement>
                  <button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                    Add Your First Item
                  </button>
                </BreathingElement>
              </Link>
            </div>
          </ScrollReveal>
        )}

        {/* My Exchanges Section */}
        <ScrollReveal>
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">My Exchanges</h2>
            
            {exchangesLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-gray-900 p-6 rounded-2xl animate-pulse">
                    <div className="h-4 bg-gray-800 rounded mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : userExchanges.length > 0 ? (
              <div className="space-y-4">
                {userExchanges.map((exchange: any, index: number) => (
                  <ScrollReveal key={exchange.id} delay={index * 0.1}>
                    <BreathingElement delay={index * 0.1}>
                      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold mb-2">Exchange #{exchange.id.slice(0, 8)}</h4>
                            <p className="text-gray-400 text-sm">
                              Status: <span className={`font-semibold ${
                                exchange.status === 'completed' ? 'text-emerald-400' :
                                exchange.status === 'pending' ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>{exchange.status}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Points</div>
                            <div className="text-lg font-semibold text-emerald-400">
                              +{exchange.pointsAwarded || 10}
                            </div>
                          </div>
                        </div>
                      </div>
                    </BreathingElement>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-900 rounded-2xl">
                <div className="text-6xl mb-4">🔄</div>
                <h3 className="text-2xl font-semibold mb-4">No exchanges yet</h3>
                <p className="text-gray-400">Start browsing items to make your first swap!</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}