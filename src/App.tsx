import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Globe, 
  Share2, 
  Clock, 
  MapPin, 
  Phone, 
  Utensils, 
  Star,
  ChevronRight,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  CreditCard as ApplePay,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// --- Types ---

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number; // Changed to number for calculations
  category: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// --- Components ---

const Navbar = ({ cartCount, onOpenCart, onGoHome }: { cartCount: number, onOpenCart: () => void, onGoHome: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', onClick: onGoHome },
    { name: 'Menu', href: '#menu', onClick: onGoHome },
    { name: 'Our Story', href: '#story', onClick: onGoHome },
    { name: 'Contact', href: '#contact', onClick: onGoHome },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-brand-cream/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={onGoHome} className="font-serif text-3xl font-bold tracking-tight text-brand-brown">
          WiCook<span className="text-brand-terracotta">.</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={link.onClick}
              className="text-sm font-medium uppercase tracking-widest text-brand-brown hover:text-brand-terracotta transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4 border-l border-brand-brown/10 pl-8">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-brand-brown hover:text-brand-terracotta transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => cartCount > 0 ? onOpenCart() : document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-brown text-brand-cream px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-terracotta transition-all transform hover:scale-105"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={onOpenCart} className="relative p-2 text-brand-brown">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="text-brand-brown"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-cream shadow-xl border-t border-brand-brown/10 p-6 flex flex-col space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  link.onClick();
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById(link.href.replace('#', ''));
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xl font-serif text-brand-brown hover:text-brand-terracotta"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (cartCount > 0) {
                  onOpenCart();
                } else {
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-brand-brown text-brand-cream w-full py-4 rounded-xl font-bold uppercase tracking-widest"
            >
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 bg-brand-soft-pink text-brand-terracotta text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Sweetest Moments in Every Bite
          </span>
          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] text-brand-brown mb-8 text-balance">
            Crafting <span className="italic text-brand-terracotta">Sweet</span> Joy Daily.
          </h1>
          <p className="text-lg text-brand-brown/70 max-w-md mb-10 leading-relaxed font-light">
            Indulge in our artisanal desserts, handcrafted with love and the finest ingredients. From nostalgic childhood favorites to modern culinary treats.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-terracotta text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-brown transition-all shadow-lg flex items-center gap-2"
            >
              Explore Menu <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full border border-brand-brown/20 font-bold uppercase tracking-widest hover:bg-brand-brown hover:text-brand-cream transition-all"
            >
              Our Story
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl transform rotate-3">
             <img 
               src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=1200&h=1400" 
               alt="Gourmet Dessert Assortment" 
               className="w-full h-[600px] object-cover"
               referrerPolicy="no-referrer"
             />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold rounded-full opacity-20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-terracotta/10 rounded-full blur-3xl" />
          
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -left-12 z-20 bg-white p-4 rounded-2xl shadow-xl hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Star fill="currentColor" size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-brown">Signature Treat</p>
                <p className="text-sm font-serif">Velvet Lava Cake</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-soft-pink/30 -z-0 rounded-l-[100px]" />
    </section>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, qty: number) => void;
  key?: number;
}

const MenuItemCard = ({ item, onAddToCart }: MenuItemCardProps) => {
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    onAddToCart(item, qty);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group bg-brand-cream/50 rounded-3xl overflow-hidden hover:bg-white hover:shadow-2xl hover:shadow-brand-brown/5 transition-all duration-500 border border-brand-brown/5 flex flex-col"
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-brown">
          ${item.price.toFixed(2)}
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-serif text-brand-brown mb-3">{item.name}</h3>
        <p className="text-sm text-brand-brown/60 leading-relaxed mb-6 italic h-12 overflow-hidden">{item.description}</p>
        
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between gap-4 p-2 bg-white rounded-2xl border border-brand-brown/5">
            <button 
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-xl hover:bg-brand-cream flex items-center justify-center text-brand-brown transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="font-bold text-brand-brown w-6 text-center">{qty}</span>
            <button 
              onClick={() => setQty(q => q + 1)}
              className="w-10 h-10 rounded-xl hover:bg-brand-cream flex items-center justify-center text-brand-brown transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <button 
            onClick={handleAdd}
            className={cn(
              "w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-terracotta/5",
              isAdding ? "bg-green-500 text-white scale-95" : "bg-brand-brown text-brand-cream hover:bg-brand-terracotta"
            )}
          >
            {isAdding ? "Added!" : "Add to Cart"} <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const MenuSection = ({ onAddToCart }: { onAddToCart: (item: MenuItem, qty: number) => void }) => {
  const menuCategories = ["All", "Signature Cakes", "Pastries", "Artisan Cookies", "Beverages"];
  const [activeCategory, setActiveCategory] = useState("All");

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Velvet Chocolate Lava",
      description: "Warm molten chocolate center with organic vanilla bean gelato and seasonal berries.",
      price: 12.50,
      category: "Signature Cakes",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800&h=800"
    },
    {
      id: 2,
      name: "Tuscan Lemon Tart",
      description: "Tangy lemon curd in a buttered shortcrust pastry, topped with toasted meringue peaks.",
      price: 9.00,
      category: "Pastries",
      image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800&h=800"
    },
    {
      id: 3,
      name: "Sea Salt Caramel Macaron",
      description: "Delicate almond shells filled with rich house-made salted caramel ganache.",
      price: 4.50,
      category: "Pastries",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800&h=800"
    },
    {
      id: 4,
      name: "Brown Butter Pecan Cookie",
      description: "Soft-baked with hand-toasted pecans and dark chocolate chunks.",
      price: 3.75,
      category: "Artisan Cookies",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800&h=800"
    },
    {
      id: 5,
      name: "Lychee Iced Tea",
      description: "Aromatic beverage blending brewed tea—typically black or green—with sweet, floral lychee fruit or syrup",
      price: 6.50,
      category: "Beverages",
      image: "https://images.unsplash.com/photo-1599767431130-41b1c51d9a7b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 6,
      name: "Signature Strawberry Layer",
      description: "Moist sponge with fresh local strawberries and mascarpone cream frosting.",
      price: 14.00,
      category: "Signature Cakes",
      image: "https://images.unsplash.com/photo-1675430288952-a9313ac90ff4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-brand-brown mb-4 tracking-tight text-balance">The Sweet Palette</h2>
          <p className="text-brand-brown/60 max-w-2xl mx-auto">Discover a world of flavors expertly crafted to satisfy your deepest cravings.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                activeCategory === category 
                  ? "bg-brand-terracotta text-white shadow-md shadow-brand-terracotta/20" 
                  : "bg-brand-cream text-brand-brown hover:bg-brand-soft-pink"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};


const AboutStory = () => {
  return (
    <section id="story" className="py-32 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="relative z-10 w-full aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?auto=format&fit=crop&q=80&w=800&h=1000" 
                  alt="A nostalgic small bakery stall" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
             </div>
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-soft-pink rounded-full -z-0" />
             <div className="absolute top-1/2 -left-12 -translate-y-1/2 p-6 bg-brand-brown text-brand-cream rounded-2xl shadow-xl hidden md:block">
               <p className="text-4xl font-serif mb-1 italic">2014</p>
               <p className="text-xs uppercase tracking-widest opacity-70">The Journey Began</p>
             </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-brand-terracotta text-xs font-bold uppercase tracking-widest border border-brand-terracotta/10">
              <Utensils size={14} /> Our Story
            </div>
            <h2 className="text-5xl font-serif text-brand-brown leading-tight">From Extra Pocket Money to <span className="italic text-brand-terracotta">Sweet Success.</span></h2>
            
            <div className="space-y-6 text-brand-brown/70 leading-relaxed font-light">
              <p>
                WiCook started as a humble dream of an 11-year-old child who wanted a little extra pocket money. What began with a small tray of cookies and a handwritten "Fresh Scones" sign in a neighborhood park quickly transformed into a local obsession.
              </p>
              <p>
                With each batch of brownies and every tartlet crafted in our family kitchen, we learned that desserts were more than just food—they were memories, comfort, and shared smiles.
              </p>
              <p>
                Today, WiCook stands as a simple yet sophisticated sweet treat cafe. We’ve kept it small by choice, focusing on artisanal quality over quantity, ensuring every visitor feels the same childhood magic that started it all.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-brand-brown/10">
              <div>
                <p className="text-3xl font-serif text-brand-brown">10k+</p>
                <p className="text-xs uppercase tracking-widest opacity-60">Sweets Served</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-brand-brown">100%</p>
                <p className="text-xs uppercase tracking-widest opacity-60">Handmade Daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      text: "Literally the best lava cake I've ever had. The atmosphere is so cozy and warm, it feels like visiting an old friend's studio.",
      author: "Emma S.",
      role: "Local Foodie"
    },
    {
      id: 2,
      text: "The story behind WiCook is as sweet as their pastries. I love supporting a business that stayed true to its humble roots.",
      author: "Julian M.",
      role: "Regular Customer"
    },
    {
      id: 3,
      text: "That Lavender Honey Latte changed my life. Perfectly balanced and not too sweet. A hidden gem in the city!",
      author: "Sarah L.",
      role: "Artist"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative quotes */}
      <div className="absolute top-10 left-10 text-[20rem] font-serif text-brand-brown/5 pointer-events-none line-height-0">&ldquo;</div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-brand-brown mb-4">Sweet Nothings</h2>
          <p className="text-brand-brown/60">What our visitors are saying about their WiCook experience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-brand-cream/30 p-10 rounded-[40px] border border-brand-brown/5 hover:border-brand-terracotta/20 transition-colors">
              <div className="flex gap-1 text-brand-gold mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg text-brand-brown mb-8 font-serif leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
              <div>
                <p className="font-bold text-brand-brown">{review.author}</p>
                <p className="text-xs uppercase tracking-widest opacity-60">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactAndHours = () => {
  return (
    <section id="contact" className="py-32 bg-brand-brown text-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-serif mb-8 leading-tight">Visit Our <span className="italic text-brand-soft-pink">Little Haven.</span></h2>
            
            <div className="space-y-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Our Location</h4>
                  <p className="text-brand-cream/70">123 Confectioner's Way,<br />Bloom District, NY 10012</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Operating Hours</h4>
                  <p className="text-brand-cream/70 italic mb-2">Closed on Mondays</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-brand-cream/60">
                    <span>Tue - Thu</span> <span>10:00 AM - 07:00 PM</span>
                    <span>Fri - Sat</span> <span>09:00 AM - 09:00 PM</span>
                    <span>Sun</span> <span>10:00 AM - 05:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Direct Contact</h4>
                  <p className="text-brand-cream/70">orders@wicook.cafe<br />+1 (555) 827-3388</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 lg:p-12 text-brand-brown shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-soft-pink/50 rounded-bl-[100px] -z-0" />
             
             <div className="relative z-10">
               <h3 className="text-3xl font-serif mb-2">Order or Reserve</h3>
               <p className="text-brand-brown/60 mb-8 text-sm">Send us a message and we'll get back to you shortly.</p>
               
               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Your Name</label>
                       <input type="text" className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-terracotta outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Email Address</label>
                       <input type="email" className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-terracotta outline-none transition-all" placeholder="john@example.com" />
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Select Purpose</label>
                    <select className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-terracotta outline-none transition-all appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Online Order Request</option>
                      <option>Table Reservation</option>
                      <option>Special Event Catering</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Message</label>
                    <textarea rows={4} className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-terracotta outline-none transition-all resize-none" placeholder="Tell us what you're craving..."></textarea>
                 </div>

                 <button className="w-full bg-brand-terracotta text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-brown transition-all shadow-xl shadow-brand-terracotta/10">
                   Send Message
                 </button>
               </form>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  onUpdateQuantity: (id: number, delta: number) => void,
  onRemove: (id: number) => void,
  onCheckout: () => void
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-brown/20 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-brand-brown/10 flex items-center justify-between">
              <h2 className="text-2xl font-serif text-brand-brown">Your Cart</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-brand-brown/5 rounded-full text-brand-brown"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={64} className="mb-4" />
                  <p className="text-xl font-serif">Your cart is empty</p>
                  <p className="text-sm uppercase tracking-widest mt-2">Go pick some sweets!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-brand-brown/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-serif text-lg text-brand-brown leading-tight">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-brand-terracotta transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-brand-terracotta mb-3">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg border border-brand-brown/10 flex items-center justify-center hover:bg-white text-brand-brown transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg border border-brand-brown/10 flex items-center justify-center hover:bg-white text-brand-brown transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-white border-t border-brand-brown/10 space-y-6 font-sans">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-brown/50">Subtotal</p>
                  <p className="text-3xl font-serif text-brand-brown">${subtotal.toFixed(2)}</p>
                </div>
                <p className="text-xs text-brand-brown/40 italic">Shipping & tax calculated at checkout</p>
              </div>
              
              <button 
                disabled={items.length === 0}
                onClick={onCheckout}
                className="w-full bg-brand-terracotta text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-brown transition-all shadow-xl shadow-brand-terracotta/20 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                Checkout <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CheckoutPage = ({
  items,
  onBack,
  onClearCart
}: {
  items: CartItem[],
  onBack: () => void,
  onClearCart: () => void
}) => {
  const [step, setStep] = useState(1);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    city: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    setTimeout(() => {
      onClearCart();
    }, 500);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-brand-cream">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[60px] text-center shadow-2xl border border-brand-brown/5 mx-6"
        >
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-lg">
            <Star size={48} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-serif text-brand-brown mb-4">A Sweet Success!</h2>
          <p className="text-brand-brown/60 mb-10 leading-relaxed font-sans">
            Your order has been placed and is now in the hands of our pastry chefs. We'll send a confirmation to your email shortly.
          </p>
          <button 
            onClick={onBack}
            className="bg-brand-brown text-brand-cream px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-terracotta transition-all"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-cream font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-brown mb-12 hover:text-brand-terracotta transition-colors"
        >
          <ChevronLeft size={16} /> Back to browsing
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start text-brand-brown">
          {/* Form Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl font-serif text-brand-brown mb-2">Order Details</h2>
              <p className="text-brand-brown/50 uppercase tracking-widest text-xs font-bold">Secure Checkout Powered by WiCook</p>
            </div>

            <form onSubmit={handleComplete} className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-xl font-serif flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-brown text-brand-cream text-xs flex items-center justify-center font-bold font-sans">1</span>
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Email Address</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 bg-white rounded-2xl border-none focus:ring-2 focus:ring-brand-terracotta outline-none transition-all shadow-sm" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-6 py-4 bg-white rounded-2xl border-none focus:ring-2 focus:ring-brand-terracotta outline-none transition-all shadow-sm" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-serif flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-brown text-brand-cream text-xs flex items-center justify-center font-bold font-sans">2</span>
                  Delivery Address
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Full Street Address</label>
                    <input required type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-6 py-4 bg-white rounded-2xl border-none focus:ring-2 focus:ring-brand-terracotta outline-none transition-all shadow-sm" placeholder="123 Confectioner's Way" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">City</label>
                      <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-6 py-4 bg-white rounded-2xl border-none focus:ring-2 focus:ring-brand-terracotta outline-none transition-all shadow-sm" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">ZIP Code</label>
                      <input required type="text" className="w-full px-6 py-4 bg-white rounded-2xl border-none focus:ring-2 focus:ring-brand-terracotta outline-none transition-all shadow-sm" placeholder="10012" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-serif flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-brown text-brand-cream text-xs flex items-center justify-center font-bold font-sans">3</span>
                  Payment Method
                </h3>
                <div className="p-8 bg-white rounded-3xl shadow-sm border border-brand-brown/5 space-y-6">
                  <div className="flex gap-4">
                    <label className="flex-1 p-4 rounded-xl border border-brand-terracotta bg-brand-terracotta/5 flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="pay" defaultChecked className="accent-brand-terracotta" />
                      <CreditCard size={20} className="text-brand-terracotta" />
                      <span className="text-sm font-bold uppercase tracking-widest">Card</span>
                    </label>
                    <label className="flex-1 p-4 rounded-xl border border-brand-brown/5 flex items-center gap-3 cursor-pointer hover:bg-brand-cream transition-colors">
                      <input type="radio" name="pay" className="accent-brand-brown" />
                      <ApplePay size={20} className="text-brand-brown" />
                      <span className="text-sm font-bold uppercase tracking-widest">Digital</span>
                    </label>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Name on Card</label>
                      <input required value={formData.cardName} onChange={(e) => setFormData({...formData, cardName: e.target.value})} type="text" className="w-full px-4 py-3 bg-brand-cream/30 rounded-xl border-none focus:ring-1 focus:ring-brand-terracotta outline-none text-sm" placeholder="JOHN DOE" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Card Number</label>
                      <input required value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} type="text" className="w-full px-4 py-3 bg-brand-cream/30 rounded-xl border-none focus:ring-1 focus:ring-brand-terracotta outline-none text-sm" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">Expiry</label>
                        <input required value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} type="text" className="w-full px-4 py-3 bg-brand-cream/30 rounded-xl border-none focus:ring-1 focus:ring-brand-terracotta outline-none text-sm" placeholder="MM / YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-1">CVV</label>
                        <input required value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} type="text" className="w-full px-4 py-3 bg-brand-cream/30 rounded-xl border-none focus:ring-1 focus:ring-brand-terracotta outline-none text-sm" placeholder="000" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-brand-terracotta text-white py-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-brown transition-all shadow-2xl shadow-brand-terracotta/20 text-lg">
                Pay ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Sticky Summary */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-brand-brown/5">
              <h3 className="text-2xl font-serif text-brand-brown mb-8 flex justify-between items-center">
                Your Order
                <span className="text-sm font-sans font-normal text-brand-brown/50">({items.length} items)</span>
              </h3>
              
              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-brand-brown/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-serif text-brand-brown">{item.name}</h4>
                        <p className="text-sm font-bold font-sans">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-brand-brown/40 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-brand-brown/5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-brown/60">Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-brown/60">Shipping</span>
                  <span className="font-bold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-brown/60">Tax (8%)</span>
                  <span className="font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-serif text-brand-brown pt-4 border-t border-brand-brown/5">
                  <span>Total</span>
                  <span className="text-brand-terracotta">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-6 bg-brand-brown/5 rounded-3xl border border-brand-brown/10">
              <Clock className="text-brand-terracotta" size={20} />
              <p className="text-xs text-brand-brown/60">
                <span className="font-bold text-brand-brown uppercase tracking-widest block mb-0.5">Estimated Arrival</span>
                Today, between 4:30 PM & 5:15 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-brand-cream border-t border-brand-brown/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <a href="#" className="font-serif text-4xl text-brand-brown mb-6 block">WiCook.</a>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-brand-cream transition-all"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-brand-cream transition-all"><Share2 size={18} /></a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm uppercase tracking-widest font-bold text-brand-brown/70">
            <a href="#menu" className="hover:text-brand-terracotta">Menu</a>
            <a href="#story" className="hover:text-brand-terracotta">Our Story</a>
            <a href="#contact" className="hover:text-brand-terracotta">Contact</a>
            <a href="#" className="hover:text-brand-terracotta">Privacy Policy</a>
          </div>

          <div className="text-center md:text-right">
             <p className="text-xs text-brand-brown/50 uppercase tracking-widest mb-1">Stay updated with our bake schedule</p>
             <div className="flex gap-2">
               <input type="email" placeholder="email@example.com" className="bg-white border border-brand-brown/10 px-4 py-2 rounded-full text-xs outline-none focus:ring-1 focus:ring-brand-terracotta" />
               <button className="bg-brand-brown text-brand-cream text-[10px] px-4 py-2 rounded-full font-bold uppercase ">Join</button>
             </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-brand-brown/5 text-center text-xs text-brand-brown/40 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} WiCook Dessert Cafe. Crafted for Joy.
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<'home' | 'checkout'>('home');
  const [toast, setToast] = useState<{ show: boolean, message: string }>({ show: false, message: '' });

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });
    
    setToast({ show: true, message: `Added ${quantity} ${item.name} to cart` });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen selection:bg-brand-terracotta/20">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onGoHome={() => setView('home')}
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-brand-brown text-brand-cream rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <Star size={16} fill="white" />
            </div>
            <p className="font-bold text-xs uppercase tracking-widest">{toast.message}</p>
            <button 
              onClick={() => {
                setIsCartOpen(true);
                setToast({ show: false, message: '' });
              }}
              className="ml-4 text-brand-terracotta font-bold text-[10px] uppercase border-b border-brand-terracotta"
            >
              View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'home' ? (
        <>
          <Hero />
          
          {/* Banner / Promotion */}
          <div className="bg-brand-terracotta py-4 overflow-hidden mask-fade-edges">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="text-white text-xs font-bold uppercase tracking-[0.4em] mx-10">
                  Freshly Baked &bull; Modern Flavors &bull; Artisanal Quality &bull; Nostalgic Treats &bull; Local Ingredients
                </span>
              ))}
            </div>
          </div>

          <MenuSection onAddToCart={handleAddToCart} />
          <AboutStory />
          <Testimonials />
          <ContactAndHours />
        </>
      ) : (
        <CheckoutPage 
          items={cart} 
          onBack={() => setView('home')} 
          onClearCart={() => {
            setCart([]);
            setView('home');
          }}
        />
      )}

      <Footer />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fdfcf0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a372820;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
