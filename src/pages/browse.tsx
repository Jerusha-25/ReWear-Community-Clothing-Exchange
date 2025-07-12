import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { BreathingElement } from "@/components/BreathingElement";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Search, Filter, Heart } from "lucide-react";

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["/api/items"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const filteredItems = items.filter((item: any) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.categoryId === selectedCategory;
    return matchesSearch && matchesCategory && item.isAvailable;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Header */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <BreathingElement>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Browse Items
                </h1>
              </BreathingElement>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Discover unique pre-loved clothing and accessories from our community
              </p>
            </div>
          </ScrollReveal>

          {/* Search and Filters */}
          <ScrollReveal delay={0.3}>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-12 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Categories Section */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-6">Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { name: "Tops", icon: "👕" },
                    { name: "Bottoms", icon: "👖" },
                    { name: "Dresses", icon: "👗" },
                    { name: "Shoes", icon: "👟" },
                    { name: "Accessories", icon: "👜" },
                    { name: "Outerwear", icon: "🧥" }
                  ].map((category, index) => (
                    <ScrollReveal key={category.name} delay={index * 0.1}>
                      <BreathingElement delay={index * 0.1}>
                        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-emerald-500 transition-all duration-300 cursor-pointer text-center">
                          <div className="text-3xl mb-2">{category.icon}</div>
                          <h4 className="font-semibold">{category.name}</h4>
                        </div>
                      </BreathingElement>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Items Grid */}
      <div className="container mx-auto px-6 py-12">
        <ScrollReveal>
          <h3 className="text-2xl font-semibold mb-8">
            Product Listings ({filteredItems.length} items)
          </h3>
        </ScrollReveal>

        {itemsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-800"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded mb-4"></div>
                  <div className="h-6 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item: any, index: number) => (
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <BreathingElement delay={index * 0.1}>
                  <Link href={`/items/${item.id}`}>
                    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500 transition-all duration-300 cursor-pointer hover:scale-105">
                      <div className="relative h-64 bg-gray-800">
                        {item.images && item.images[0] ? (
                          <img 
                            src={item.images[0]} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <span className="text-4xl">📷</span>
                          </div>
                        )}
                        <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                          <Heart size={20} className="text-white" />
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
        )}

        {!itemsLoading && filteredItems.length === 0 && (
          <ScrollReveal>
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No items found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}