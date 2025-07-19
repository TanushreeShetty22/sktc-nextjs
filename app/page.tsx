"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  Plus,
  Minus,
  Trash2,
  MessageCircle,

  Users,
  Award,
  Truck,
} from "lucide-react";

// Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

// Cart item interface
interface CartItem extends Product {
  quantity: number;
}

// Contact form interface
interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: "Square tissue",
    description: "High-quality 30pc tissue paper packet",
    price: "₹45",
    image: "/square_tissue.jpg",
    category: "Personal",
  },
  {
    id: 2,
    name: "Toilet Roll 10-in-1",
    description: "Soft and absorbent 10-in-1 pack for daily use",
    price: "₹200",
    image: "/toiletroll.jpg",
    category: "Personal",
  },
  {
    id: 3,
    name: "Kitchen Towels",
    description: "Durable kitchen towels for all cleaning needs",
    price: "₹120",
    image: "/kitchenroll.jpg",
    category: "Kitchen",
  },
  {
    id: 4,
    name: "Car Tissues",
    description: "Premium quality napkin papers for your cars with stylish packaging",
    price: "₹50",
    image: "/car_tissue.jpg",
    category: "Commercial",
  },
  // {
  //   id: 5,
  //   name: "Toilet Paper",
  //   description: "Soft and strong toilet paper rolls",
  //   price: "₹65",
  //   image:
  //     "https://images.unsplash.com/photo-1619451334792-150faee7c86f?w=400&h=300&fit=crop",
  //   category: "Personal",
  // },
  // {
  //   id: 6,
  //   name: "Hand Towels",
  //   description: "Absorbent hand towels for washrooms",
  //   price: "₹150",
  //   image:
  //     "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop",
  //   category: "Commercial",
  // },
];

const SKTCWebsite = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  // Initialize quantities for all products
  useEffect(() => {
    const initialQuantities: Record<number, number> = {};
    products.forEach((product) => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const addToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change),
    }));
  };

  const sendWhatsAppOrder = () => {
    const phoneNumber = "919820357044"; // Replace with actual WhatsApp number
    let orderText = "Hello! I would like to order:\n\n";

    cart.forEach((item) => {
      orderText += `• ${item.quantity} x ${item.name} (${item.price} each)\n`;
    });

    orderText +=
      "\nMy Details:\nName: _____\nAddress: _____\n\nPlease confirm the order and delivery details.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      orderText
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "919876543210";
    const message = `Contact Form Submission:\n\nName: ${contactForm.name}\nEmail: ${contactForm.email}\nMessage: ${contactForm.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setContactForm({ name: "", email: "", message: "" });
  };

  const Header = () => (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            {/* <div className="w-15 h-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center"> */}
            <img
              src="/SKTC-logo.png"
              alt="SK Logo"
              className="w-25 h-25 object-contain"
            />
            {/* </div> */}
            <div>
              <h1 className="text-xl font-bold text-gray-900">Shree Krishna</h1>
              <p className="text-sm text-gray-600">Tissue Converter</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === "home"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("products")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === "products"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentPage("cart")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                currentPage === "cart"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <ShoppingCart className="w-5 h-5 inline mr-1" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === "contact"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            1<sup>st</sup> Class Tissue Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            From Shree Krishna Tissue Converter - Your trusted partner for
            high-quality tissue solutions
          </p>
          <button
            onClick={() => setCurrentPage("products")}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Browse Products
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the finest materials to ensure superior quality in
                all our products.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Truck className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery service to meet your urgent tissue
                supply needs.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Focused</h3>
              <p className="text-gray-600">
                Dedicated customer service team ready to assist you with all
                your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        About SKTC
      </h2>
    </div>
    
    {/* Side by side content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Text Content */}
      <div className="space-y-6">
        <p className="text-lg text-gray-600 leading-relaxed">
          Shree Krishna Tissue Converter has been a leading manufacturer and
          supplier of premium tissue products for over a decade. We
          specialize in converting raw materials into high-quality tissue
          products that meet the diverse needs of our customers across
          commercial and personal segments.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Our commitment to quality, innovation, and customer satisfaction 
          has made us a trusted name in the tissue manufacturing industry.
        </p>
      </div>
      
      {/* Image */}
      <div className="flex justify-center lg:justify-end">
        <img 
          src="/allproductnew.png" 
          alt="SKTC Products" 
          className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg" 
        />
      </div>
    </div>
  </div>
</section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Products
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">
                      {product.price}
                    </span>
                    <button
                      onClick={() => setCurrentPage("products")}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const ProductsPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                  {product.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {quantities[product.id] || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => setCurrentPage("products")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-blue-600 font-bold">{item.price} each</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Ready to Order?</h3>
                <p className="text-gray-600 mb-6">
                  Click below to send your order details via WhatsApp. Our team
                  will contact you to confirm the order and arrange delivery.
                </p>
                <button
                  onClick={sendWhatsAppOrder}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2 mx-auto"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Order via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

 const ContactPage = () => (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contact Us</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact Form - Left Column */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Send Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <button
                onClick={handleContactSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Information - Middle Column */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Phone</p>
                  <p className="text-gray-600 text-sm">+91 9820357044</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-gray-600 text-sm">+91 9820357044</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-gray-600 text-sm">krishnashetty72@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Address</p>
                  <p className="text-gray-600 text-sm">
                    Gala no.10, Khindipada, Dakline Rd,
                    Dargah Rd, Bhandup West,
                    Mumbai, Maharashtra 400078
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-2 text-sm">Business Hours</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Map - Right Column */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <div className="aspect-square">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.743!2d72.936386!3d19.147297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8d8e9f8b8b9%3A0x5d5d5d5d5d5d5d5d!2sGala%20no.10%2C%20Khindipada%2C%20Dakline%20Rd%2C%20Dargah%20Rd%2C%20Bhandup%20West%2C%20Mumbai%2C%20Maharashtra%20400078!5e0!3m2!1sen!2sin!4v1640995200000"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="mt-2 space-y-2">
                <a
                  href="https://maps.google.com/?q=Shree+Krishna+Tissue+Convertor+,+Bhandup+West,+Mumbai,+Maharashtra+400078"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Open in Maps
                </a>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const WhatsAppButton = () => (
    <button
      onClick={() => {
        const phoneNumber = "919820357044";
        const message =
          "Hello! I'm interested in your tissue products. Can you please provide more information?";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;
        window.open(whatsappUrl, "_blank");
      }}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductsPage />;
      case "cart":
        return <CartPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {renderCurrentPage()}
      <WhatsAppButton />
    </div>
  );
};

export default SKTCWebsite;
