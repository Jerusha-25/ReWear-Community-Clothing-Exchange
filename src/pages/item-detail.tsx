import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { BreathingElement } from "@/components/BreathingElement";
import { ScrollReveal } from "@/components/ScrollReveal";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Heart, Share2, Package, Star } from "lucide-react";

export default function ItemDetail() {
  const [, params] = useRoute("/items/:id");
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: item, isLoading } = useQuery({
    queryKey: ["/api/items", params?.id],
    enabled: !!params?.id,
  });

  const { data: userItems = [] } = useQuery({
    queryKey: ["/api/users", user?.id, "items"],
    enabled: !!user?.id,
  });

  const createExchangeMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("/api/exchanges", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      toast({
        title: "Exchange Request Sent!",
        description: "Your swap request has been sent to the item owner.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/exchanges"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send exchange request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSwapRequest = (offeredItemId: string) => {
    if (!params?.id || !offeredItemId) return;
    
    createExchangeMutation.mutate({
      offeredItemId,
      requestedItemId: params.id,
      receiverId: item?.ownerId,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-800 rounded w-1/4 mb-8"></div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="h-96 bg-gray-800 rounded-2xl"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-32 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-6 text-center">
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-2xl font-semibold mb-4">Item not found</h1>
            <p className="text-gray-400">The item you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const images = item.images || [];
  const currentImage = images[selectedImage] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <ScrollReveal>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span>Back to Browse</span>
            </button>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <ScrollReveal>
              <div>
                <BreathingElement>
                  <div className="relative bg-gray-900 rounded-2xl overflow-hidden mb-6">
                    <img 
                      src={currentImage}
                      alt={item.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                        <Heart size={20} className="text-white" />
                      </button>
                      <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                        <Share2 size={20} className="text-white" />
                      </button>
                    </div>
                  </div>
                </BreathingElement>

                {/* Product Images */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((image: string, index: number) => (
                      <BreathingElement key={index} delay={index * 0.1}>
                        <button
                          onClick={() => setSelectedImage(index)}
                          className={`relative bg-gray-800 rounded-lg overflow-hidden aspect-square ${
                            selectedImage === index ? "ring-2 ring-emerald-500" : ""
                          }`}
                        >
                          <img 
                            src={image}
                            alt={`${item.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </BreathingElement>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Product Details */}
            <ScrollReveal delay={0.3}>
              <div>
                <BreathingElement>
                  <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
                </BreathingElement>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-emerald-600 px-4 py-2 rounded-full text-sm font-semibold">
                    {item.condition}
                  </span>
                  <span className="text-gray-400">Size: {item.size || "N/A"}</span>
                  {item.brand && (
                    <span className="text-gray-400">Brand: {item.brand}</span>
                  )}
                </div>

                <BreathingElement delay={0.2}>
                  <div className="bg-gray-900 p-6 rounded-2xl mb-6">
                    <h3 className="text-xl font-semibold mb-3">Add Product Description</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </BreathingElement>

                {/* Swap Action */}
                {user?.id !== item.ownerId && item.isAvailable && (
                  <BreathingElement delay={0.4}>
                    <div className="bg-gray-900 p-6 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-4">
                        <Package size={24} className="text-emerald-400" />
                        <h3 className="text-xl font-semibold">Available for Swap</h3>
                      </div>
                      
                      {userItems.filter((userItem: any) => userItem.isAvailable).length > 0 ? (
                        <div>
                          <p className="text-gray-400 mb-4">
                            Select one of your items to propose a swap:
                          </p>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {userItems
                              .filter((userItem: any) => userItem.isAvailable)
                              .slice(0, 4)
                              .map((userItem: any) => (
                                <button
                                  key={userItem.id}
                                  onClick={() => handleSwapRequest(userItem.id)}
                                  disabled={createExchangeMutation.isPending}
                                  className="text-left bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                                >
                                  <div className="aspect-square bg-gray-700 rounded mb-2 overflow-hidden">
                                    {userItem.images?.[0] ? (
                                      <img 
                                        src={userItem.images[0]}
                                        alt={userItem.title}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        📷
                                      </div>
                                    )}
                                  </div>
                                  <h4 className="font-semibold text-sm truncate">
                                    {userItem.title}
                                  </h4>
                                  <p className="text-xs text-gray-400 truncate">
                                    {userItem.condition}
                                  </p>
                                </button>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-4xl mb-4">📦</div>
                          <p className="text-gray-400 mb-4">
                            You need to list items before you can propose swaps
                          </p>
                          <button
                            onClick={() => window.location.href = "/add-item"}
                            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                          >
                            List Your First Item
                          </button>
                        </div>
                      )}
                    </div>
                  </BreathingElement>
                )}

                {/* Owner's Other Items */}
                <ScrollReveal delay={0.6}>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Previous Listings:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[...Array(4)].map((_, index) => (
                        <BreathingElement key={index} delay={index * 0.1}>
                          <div className="bg-gray-900 rounded-lg overflow-hidden">
                            <div className="aspect-square bg-gray-800 flex items-center justify-center">
                              <span className="text-gray-500 text-2xl">📷</span>
                            </div>
                            <div className="p-3">
                              <h4 className="font-semibold text-sm truncate">
                                Sample Item {index + 1}
                              </h4>
                              <p className="text-xs text-gray-400">
                                Good condition
                              </p>
                            </div>
                          </div>
                        </BreathingElement>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}