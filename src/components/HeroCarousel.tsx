import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    alt: "Sustainable fashion community"
  },
  {
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    alt: "Vintage clothing rack"
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    alt: "Fashion swap event"
  },
  {
    src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    alt: "Sustainable fashion items"
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    alt: "Eco-friendly clothing"
  }
];

export function HeroCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let currentIndex = 0;
    const images = carousel.querySelectorAll('.carousel-image') as NodeListOf<HTMLElement>;
    
    const showImage = (index: number) => {
      images.forEach((img, i) => {
        img.style.opacity = i === index ? '1' : '0';
      });
    };

    const nextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    };

    // Show first image immediately
    showImage(0);

    // Auto-advance every 4 seconds
    const interval = setInterval(nextImage, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={carouselRef} className="absolute inset-0 w-full h-full">
      {carouselImages.map((image, index) => (
        <motion.img
          key={index}
          src={image.src}
          alt={image.alt}
          className="carousel-image absolute inset-0 w-full h-full object-cover opacity-0"
          style={{
            transition: 'opacity 2s ease-in-out'
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
        />
      ))}
    </div>
  );
}
