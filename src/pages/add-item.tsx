import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { BreathingElement } from "@/components/BreathingElement";
import { ScrollReveal } from "@/components/ScrollReveal";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertItemSchema } from "@shared/schema";
import { z } from "zod";
import { Upload, X, Camera } from "lucide-react";

const formSchema = insertItemSchema.extend({
  images: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddItem() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      size: "",
      brand: "",
      condition: "good",
      images: [],
    },
  });

  const createItemMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const itemData = {
        ...data,
        images: imageUrls,
      };
      return apiRequest("/api/items", {
        method: "POST",
        body: JSON.stringify(itemData),
      });
    },
    onSuccess: () => {
      toast({
        title: "Item Listed Successfully!",
        description: "Your item is now available for swapping.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id, "items"] });
      form.reset();
      setImageUrls([]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to list item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createItemMutation.mutate(data);
  };

  const addImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url && url.trim()) {
      setImageUrls([...imageUrls, url.trim()]);
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Header */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <BreathingElement>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Add New Item
                </h1>
              </BreathingElement>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Share your pre-loved items with the community and start swapping!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Image Upload Section */}
            <ScrollReveal>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-6">Add Images</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Main Image Area */}
                  <div>
                    <BreathingElement>
                      <div 
                        onClick={addImageUrl}
                        className="relative aspect-square bg-gray-800 border-2 border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors"
                      >
                        {imageUrls.length > 0 ? (
                          <img 
                            src={imageUrls[0]}
                            alt="Main product image"
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        ) : (
                          <>
                            <Camera size={48} className="text-gray-500 mb-4" />
                            <p className="text-gray-500 text-center">
                              Click to add main image
                            </p>
                          </>
                        )}
                      </div>
                    </BreathingElement>
                  </div>

                  {/* Additional Images */}
                  <div>
                    <h4 className="font-semibold mb-4">Product Images</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {imageUrls.slice(1, 5).map((url, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={url}
                            alt={`Product image ${index + 2}`}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index + 1)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      
                      {imageUrls.length < 5 && (
                        <BreathingElement>
                          <button
                            type="button"
                            onClick={addImageUrl}
                            className="aspect-square bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-emerald-500 transition-colors"
                          >
                            <Upload size={24} className="text-gray-500" />
                          </button>
                        </BreathingElement>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={addImageUrl}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Add Image URL
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Product Details */}
            <ScrollReveal delay={0.2}>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-6">Add Product Description</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Product Title</label>
                    <input
                      {...form.register("title")}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter product title"
                    />
                    {form.formState.errors.title && (
                      <p className="text-red-400 text-sm mt-1">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      {...form.register("categoryId")}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Condition</label>
                    <select
                      {...form.register("condition")}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                    </select>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <input
                      {...form.register("size")}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="e.g., M, 32, One Size"
                    />
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Brand</label>
                    <input
                      {...form.register("brand")}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Brand name"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      {...form.register("description")}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                      placeholder="Describe your item in detail..."
                    />
                    {form.formState.errors.description && (
                      <p className="text-red-400 text-sm mt-1">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Submit Button */}
            <ScrollReveal delay={0.4}>
              <div className="text-center">
                <BreathingElement>
                  <button
                    type="submit"
                    disabled={createItemMutation.isPending}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createItemMutation.isPending ? "Listing Item..." : "Available/Swap"}
                  </button>
                </BreathingElement>
              </div>
            </ScrollReveal>
          </form>
        </div>
      </div>
    </div>
  );
}