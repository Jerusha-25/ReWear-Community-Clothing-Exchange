import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { BreathingElement } from "@/components/BreathingElement";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Search, Plus, TrendingUp, Award, Users, Package } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  const { data: items = [] } = useQuery({
    queryKey: ["/api/items"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Dummy featured items for display
  const dummyFeaturedItems = [
    {
      id: "1",
      title: "Vintage Denim Jacket",
      description: "Classic blue denim jacket in excellent condition",
      condition: "excellent",
      size: "M",
      brand: "Levi's",
      images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"],
      isAvailable: true
    },
    {
      id: "2", 
      title: "Floral Summer Dress",
      description: "Beautiful floral print dress perfect for summer",
      condition: "like new",
      size: "S",
      brand: "Zara",
      images: ["https://images.unsplash.com/photo-1566479179817-c0c98a23e1f8?w=400&h=300&fit=crop"],
      isAvailable: true
    },
    {
      id: "3",
      title: "Designer Sneakers",
      description: "Comfortable running shoes in great condition",
      condition: "good",
      size: "8",
      brand: "Nike",
      images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop"],
      isAvailable: true
    },
    {
      id: "4",
      title: "Leather Handbag",
      description: "Elegant leather handbag with multiple compartments",
      condition: "excellent",
      size: "Medium",
      brand: "Coach",
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"],
      isAvailable: true
    }
  ];

  const featuredItems = items.length > 0 ? items.filter((item: any) => item.isAvailable).slice(0, 4) : dummyFeaturedItems;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <HeroCarousel />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-6">
            <ScrollReveal>
              <BreathingElement>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Welcome Back to
                  <span className="text-emerald-400 block">FashionSwap</span>
                </h1>
              </BreathingElement>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Start Swapping • Browse Items • Build Your Sustainable Wardrobe
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/browse">
                  <BreathingElement delay={0.2}>
                    <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
                      <Search size={24} />
                      <span>Browse Items</span>
                    </button>
                  </BreathingElement>
                </Link>
                
                <Link href="/add-item">
                  <BreathingElement delay={0.4}>
                    <button className="flex items-center space-x-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
                      <Plus size={24} />
                      <span>Add Item</span>
                    </button>
                  </BreathingElement>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: Package, 
                  value: items.length, 
                  label: "Items Available", 
                  color: "emerald" 
                },
                { 
                  icon: Users, 
                  value: "500+", 
                  label: "Active Users", 
                  color: "blue" 
                },
                { 
                  icon: TrendingUp, 
                  value: "1.2k", 
                  label: "Swaps Completed", 
                  color: "purple" 
                },
                { 
                  icon: Award, 
                  value: user?.points || 0, 
                  label: "Your Points", 
                  color: "emerald" 
                }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <BreathingElement key={stat.label} delay={index * 0.1}>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
                        <Icon size={32} className="text-white" />
                      </div>
                      <div className="text-4xl font-bold text-emerald-400 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </BreathingElement>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
      {/* Featured Items */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Clothing Items</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Discover the latest additions from our sustainable fashion community
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item: any, index: number) => (
              <ScrollReveal key={item.id} delay={index * 0.2}>
                <BreathingElement delay={index * 0.1}>
                  <Link href={`/items/${item.id}`}>
                    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500 transition-all duration-300 cursor-pointer hover:scale-105">
                      <div className="relative h-64 bg-gray-800">
                        <img 
                          src={item.images[0]} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                          <span className="text-white text-lg">♡</span>
                        </button>
                      </div>
                      <div className="p-6">
                        <h4 className="font-semibold text-lg mb-2 truncate">{item.title}</h4>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-400 font-semibold">
                            {item.condition}
                          </span>
                          <span className="text-sm text-gray-500">
                            Size: {item.size || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </BreathingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-400">
                Categories Section
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Browse by category to find exactly what you're looking for
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Top Row */}
            <ScrollReveal delay={0.1}>
              <BreathingElement delay={0.1}>
                <Link href="/browse?category=dresses">
                  <div className="bg-white rounded-2xl p-8 text-center border-2 border-transparent hover:border-emerald-500 transition-all duration-300 cursor-pointer hover:scale-105">
                    <div className="text-6xl mb-4 text-blue-500">👗</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Dresses</h3>
                    <p className="text-gray-600">1,234 items</p>
                  </div>
                </Link>
              </BreathingElement>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <BreathingElement delay={0.2}>
                <Link href="/browse?category=tops">
                  <div className="bg-white rounded-2xl p-8 text-center border-2 border-transparent hover:border-emerald-500 transition-all duration-300 cursor-pointer hover:scale-105">
                    <div className="text-6xl mb-4 text-green-500">👕</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Tops</h3>
                    <p className="text-gray-600">856 items</p>
                  </div>
                </Link>
              </BreathingElement>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <BreathingElement delay={0.3}>
                <Link href="/browse?category=bottoms">
                  <div className="bg-white rounded-2xl p-8 text-center border-2 border-emerald-500 hover:border-emerald-600 transition-all duration-300 cursor-pointer hover:scale-105">
                    <div className="text-6xl mb-4 text-blue-600">👖</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bottoms</h3>
                    <p className="text-gray-600">672 items</p>
                  </div>
                </Link>
              </BreathingElement>
            </ScrollReveal>

            {/* Bottom Row */}
            <ScrollReveal delay={0.4}>
              <BreathingElement delay={0.4}>
                <Link href="/browse?category=shoes">
                  <div className="bg-white rounded-2xl p-8 text-center border-2 border-transparent hover:border-emerald-500 transition-all duration-300 cursor-pointer hover:scale-105">
                    <div className="text-6xl mb-4 text-pink-500">👠</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Shoes</h3>
                    <p className="text-gray-600">445 items</p>
                  </div>
                </Link>
              </BreathingElement>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <BreathingElement delay={0.5}>
                <Link href="/browse?category=accessories">
                  <div className="bg-white rounded-2xl p-8 text-center border-2 border-transparent hover:border-emerald-500 transition-all duration-300 cursor-pointer hover:scale-105">
                    <div className="text-6xl mb-4 text-amber-700">👜</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Accessories</h3>
                    <p className="text-gray-600">789 items</p>
                  </div>
                </Link>
              </BreathingElement>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <BreathingElement delay={0.6}>
                <Link href="/browse?category=bags">
                  <div className="bg-white rounded-2xl p-8 text-center border-2 border-transparent hover:border-emerald-500 transition-all duration-300 cursor-pointer hover:scale-105">
                    <div className="text-6xl mb-4 text-pink-600">👛</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bags</h3>
                    <p className="text-gray-600">321 items</p>
                  </div>
                </Link>
              </BreathingElement>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Product Listings Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
                  Product Listings
                </h2>
                <p className="text-xl text-gray-400">
                  Fresh arrivals from our community members
                </p>
              </div>
              <Link href="/browse">
                <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition-colors">
                  <span className="font-semibold">View All</span>
                  <span>→</span>
                </button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: "p1",
                title: "Vintage Denim Jacket",
                description: "Size M • Excellent condition • Levi's",
                price: "★ 150",
                owner: "Emma",
                distance: "2 km away",
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"
              },
              {
                id: "p2", 
                title: "Floral Summer Dress",
                description: "Size S • Like new • Zara",
                price: "★ 200",
                owner: "Sophie",
                distance: "1.5 km away",
                image: "https://images.unsplash.com/photo-1566479179817-c0c98a23e1f8?w=400&h=300&fit=crop"
              },
              {
                id: "p3",
                title: "Designer Sneakers", 
                description: "Size 8 • Good condition • Nike",
                price: "★ 300",
                owner: "Marcus",
                distance: "3 km away",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
                featured: true
              },
              {
                id: "p4",
                title: "Leather Handbag",
                description: "Medium • Excellent condition • Coach", 
                price: "★ 250",
                owner: "Anna",
                distance: "800m away",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
              }
            ].map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.1}>
                <BreathingElement delay={index * 0.1}>
                  <Link href={`/items/${product.id}`}>
                    <div className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                      product.featured ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-emerald-500'
                    }`}>
                      <div className="relative h-48 bg-gray-200">
                        <img 
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                          <span className="text-red-500 text-lg">♡</span>
                        </button>
                        {product.featured && (
                          <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-1">{product.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-amber-500 font-bold">{product.price}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {product.owner[0]}
                              </span>
                            </div>
                            <span className="text-gray-700 font-medium text-sm">{product.owner}</span>
                          </div>
                          <span className="text-gray-500 text-xs">{product.distance}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </BreathingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Testimonials or Impact Metrics
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Join thousands of fashion lovers building a more sustainable future
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                metric: "2.5k",
                unit: "kg CO₂",
                description: "Carbon emissions saved through swapping",
                icon: "🌱"
              },
              {
                metric: "850",
                unit: "items",
                description: "Rescued from ending up in landfills",
                icon: "♻️"
              },
              {
                metric: "95%",
                unit: "satisfaction",
                description: "Users who found items they love",
                icon: "💚"
              }
            ].map((impact, index) => (
              <ScrollReveal key={impact.description} delay={index * 0.2}>
                <BreathingElement delay={index * 0.1}>
                  <div className="text-center bg-gray-900 p-8 rounded-2xl border border-gray-800">
                    <div className="text-5xl mb-4">{impact.icon}</div>
                    <div className="text-4xl font-bold text-emerald-400 mb-2">
                      {impact.metric}
                    </div>
                    <div className="text-lg text-gray-300 mb-4">
                      {impact.unit}
                    </div>
                    <p className="text-gray-400">
                      {impact.description}
                    </p>
                  </div>
                </BreathingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
