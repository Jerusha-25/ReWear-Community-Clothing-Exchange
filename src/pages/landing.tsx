import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BreathingElement } from "@/components/BreathingElement";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Landing() {

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden" data-scroll-container>
      {/* Floating Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl top-20 -left-48"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-80 h-80 bg-blue-500/10 rounded-full blur-3xl top-96 -right-40"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute w-72 h-72 bg-purple-500/10 rounded-full blur-3xl bottom-20 left-1/3"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800" data-scroll data-scroll-sticky>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <BreathingElement>
              <div className="text-2xl font-bold text-white">
                FashionSwap
              </div>
            </BreathingElement>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-300">How It Works</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
              <a href="#community" className="text-gray-300 hover:text-white transition-colors duration-300">Community</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <BreathingElement delay={0.5}>
                <button 
                  onClick={() => window.location.href = "/signin"}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Sign In
                </button>
              </BreathingElement>
              <BreathingElement delay={1}>
                <button 
                  onClick={() => window.location.href = "/signup"}
                  className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Sign Up
                </button>
              </BreathingElement>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main data-scroll-section>
        {/* Hero Section with Carousel Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <HeroCarousel />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-6 max-w-6xl mx-auto" data-scroll data-scroll-speed="0.5">
            <BreathingElement>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="block">Swap, Share,</span>
                <span className="block text-emerald-400">Sustain</span>
              </h1>
            </BreathingElement>
            <BreathingElement delay={0.5}>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join the revolution of sustainable fashion. Exchange, discover, and give new life to pre-loved clothing in our vibrant community marketplace.
              </p>
            </BreathingElement>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <BreathingElement delay={1}>
                <button 
                  onClick={() => window.location.href = "/api/login"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  Start Swapping
                </button>
              </BreathingElement>
              <BreathingElement delay={1.5}>
                <button className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </BreathingElement>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gray-900" data-scroll data-scroll-section>
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Simple, sustainable, and social. Transform your wardrobe in three easy steps.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <ScrollReveal delay={0.2}>
                <div className="text-center">
                  <BreathingElement>
                    <div className="bg-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold">1</span>
                    </div>
                  </BreathingElement>
                  <h3 className="text-2xl font-semibold mb-4">Upload & List</h3>
                  <p className="text-gray-400">
                    Take photos of items you no longer wear and list them on our platform with detailed descriptions.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <div className="text-center">
                  <BreathingElement delay={0.2}>
                    <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                  </BreathingElement>
                  <h3 className="text-2xl font-semibold mb-4">Browse & Connect</h3>
                  <p className="text-gray-400">
                    Discover unique pieces from other members and connect with like-minded fashion enthusiasts.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.6}>
                <div className="text-center">
                  <BreathingElement delay={0.4}>
                    <div className="bg-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold">3</span>
                    </div>
                  </BreathingElement>
                  <h3 className="text-2xl font-semibold mb-4">Swap & Enjoy</h3>
                  <p className="text-gray-400">
                    Arrange exchanges, meet new people, and enjoy your refreshed wardrobe while reducing waste.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-black" data-scroll data-scroll-section>
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose FashionSwap?</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  More than just a marketplace - we're building a sustainable fashion community.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                { icon: "🌱", title: "Eco-Friendly", desc: "Reduce fashion waste and environmental impact by giving clothes a second life.", color: "emerald" },
                { icon: "👥", title: "Community Driven", desc: "Connect with fashion lovers, share styling tips, and build lasting friendships.", color: "blue" },
                { icon: "💰", title: "Cost Effective", desc: "Refresh your wardrobe without breaking the bank through smart exchanges.", color: "purple" },
                { icon: "🔒", title: "Safe & Secure", desc: "Verified profiles, secure messaging, and safe meetup locations for peace of mind.", color: "emerald" },
                { icon: "📱", title: "Mobile First", desc: "Seamless experience across all devices with our responsive design and mobile app.", color: "blue" },
                { icon: "✨", title: "Quality Curation", desc: "Our community guidelines ensure only quality items make it to the marketplace.", color: "purple" }
              ].map((feature, index) => (
                <ScrollReveal key={feature.title} delay={index * 0.1}>
                  <div className={`bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-${feature.color}-500 transition-all duration-300`}>
                    <BreathingElement delay={index * 0.1}>
                      <div className={`w-16 h-16 bg-${feature.color}-600 rounded-xl flex items-center justify-center mb-6`}>
                        <span className="text-2xl">{feature.icon}</span>
                      </div>
                    </BreathingElement>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-24 bg-gray-900" data-scroll data-scroll-section>
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <ScrollReveal>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Growing Community</h2>
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Be part of a movement that's changing how we think about fashion. Our community of 50,000+ members across 100+ cities is making sustainable fashion accessible to everyone.
                  </p>
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    {[
                      { value: "50K+", label: "Active Members", color: "emerald" },
                      { value: "100K+", label: "Items Swapped", color: "blue" },
                      { value: "100+", label: "Cities", color: "purple" },
                      { value: "95%", label: "Satisfaction", color: "emerald" }
                    ].map((stat, index) => (
                      <div key={stat.label} className="text-center">
                        <BreathingElement delay={index * 0.2}>
                          <div className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                        </BreathingElement>
                        <div className="text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <BreathingElement>
                    <button 
                      onClick={() => window.location.href = "/api/login"}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Join Community
                    </button>
                  </BreathingElement>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                    alt="Community fashion swap event" 
                    className="rounded-2xl shadow-2xl w-full h-auto" 
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-black" data-scroll data-scroll-section>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                  We believe fashion should be circular, not linear. FashionSwap is on a mission to create a world where every piece of clothing gets the maximum life possible, reducing waste and building communities along the way.
                </p>
              </ScrollReveal>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  { icon: "🌍", title: "Environmental Impact", desc: "Reducing fashion waste one swap at a time" },
                  { icon: "🤝", title: "Community Building", desc: "Connecting like-minded fashion enthusiasts" },
                  { icon: "💡", title: "Innovation", desc: "Pioneering the future of sustainable fashion" }
                ].map((mission, index) => (
                  <ScrollReveal key={mission.title} delay={index * 0.2}>
                    <div>
                      <div className="text-4xl mb-4">{mission.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
                      <p className="text-gray-400">{mission.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-gray-900 border-t border-gray-800" data-scroll data-scroll-section>
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <ScrollReveal>
                <div>
                  <BreathingElement>
                    <div className="text-2xl font-bold mb-4">FashionSwap</div>
                  </BreathingElement>
                  <p className="text-gray-400 mb-6">
                    Making sustainable fashion accessible to everyone through community-driven exchanges.
                  </p>
                  <div className="flex space-x-4">
                    {['f', '@', 'in'].map((social, index) => (
                      <BreathingElement key={social} delay={index * 0.1}>
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                          <span className="text-sm">{social}</span>
                        </div>
                      </BreathingElement>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              
              {[
                { title: "Platform", links: ["How It Works", "Browse Items", "List Items", "Community Guidelines"] },
                { title: "Support", links: ["Help Center", "Contact Us", "Safety Tips", "Terms of Service"] },
                { title: "Company", links: ["About Us", "Blog", "Careers", "Press"] }
              ].map((section, index) => (
                <ScrollReveal key={section.title} delay={(index + 1) * 0.2}>
                  <div>
                    <h4 className="font-semibold mb-4">{section.title}</h4>
                    <ul className="space-y-2 text-gray-400">
                      {section.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="hover:text-white transition-colors">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            <ScrollReveal>
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2025 FashionSwap. All rights reserved. Made with 💚 for a sustainable future.</p>
              </div>
            </ScrollReveal>
          </div>
        </footer>
      </main>


    </div>
  );
}
