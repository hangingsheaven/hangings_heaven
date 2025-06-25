import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Macrame Wall Hanging",
    price: 35.00,
    image: "https://source.unsplash.com/600x400/?macrame,boho,bright",
  },
  {
    id: 2,
    name: "Handwoven Tapestry",
    price: 45.00,
    image: "https://source.unsplash.com/600x400/?tapestry,art,colorful",
  },
  {
    id: 3,
    name: "Plant Hanging Basket",
    price: 25.00,
    image: "https://source.unsplash.com/600x400/?plant,hanging,natural",
  },
  {
    id: 4,
    name: "Woven Dreamcatcher",
    price: 30.00,
    image: "https://source.unsplash.com/600x400/?dreamcatcher,handmade",
  },
  {
    id: 5,
    name: "Colorful Yarn Wall Art",
    price: 40.00,
    image: "https://source.unsplash.com/600x400/?yarn,wallart,colorful",
  },
  {
    id: 6,
    name: "Rustic Wooden Hanging",
    price: 50.00,
    image: "https://source.unsplash.com/600x400/?wooden,wall,decor",
  },
];

const ads = [
  {
    id: 'ad1',
    text: "🌟 Summer Vibes Collection is Here! 15% OFF All Wall Hangings 🌿",
    bg: "bg-gradient-to-r from-pink-300 via-yellow-200 to-green-200",
  },
  {
    id: 'ad2',
    text: "🪴 Bring Nature Indoors – Shop Bestsellers Now!",
    bg: "bg-gradient-to-r from-green-100 via-blue-100 to-rose-100",
  },
  {
    id: 'ad3',
    text: "🎁 Use Code HANG15 at Checkout for 15% OFF!",
    bg: "bg-gradient-to-r from-yellow-200 via-red-200 to-pink-300",
  }
];

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "HANG15") {
      setDiscount(0.15);
    } else {
      setDiscount(0);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = (total * (1 - discount)).toFixed(2);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-pink-100 via-rose-50 to-yellow-50 min-h-screen">
      <header className="flex justify-between items-center mb-10 bg-white shadow-lg rounded-xl p-4">
        <h1 className="text-4xl font-extrabold text-rose-600 drop-shadow">Hangings Heaven</h1>
        <div className="flex items-center gap-2 text-rose-500 font-semibold">
          <ShoppingCart />
          <span>{cart.length} items</span>
        </div>
      </header>

      <div className="space-y-4 mb-10">
        {ads.map((ad) => (
          <div key={ad.id} className={`${ad.bg} text-center text-xl font-semibold py-3 rounded-xl shadow animate-pulse`}>{ad.text}</div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="bg-white shadow-xl rounded-2xl border border-rose-100 hover:scale-105 transform transition">
            <img src={product.image} alt={product.name} className="rounded-t-2xl w-full h-60 object-cover" />
            <CardContent className="p-4">
              <h2 className="text-2xl font-bold text-rose-700 mb-1">{product.name}</h2>
              <p className="text-lg text-yellow-600 mb-3 font-medium">${product.price.toFixed(2)}</p>
              <Button onClick={() => addToCart(product)} className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-full">Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-rose-600 mb-4">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-rose-400 italic">Your cart is currently empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-semibold text-rose-700">{item.name}</h4>
                  <p className="text-yellow-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-14 rounded object-cover" />
                  <Button onClick={() => removeFromCart(index)} className="bg-red-400 hover:bg-red-500 text-white text-sm px-3 py-1 rounded">Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4">Total: ${total.toFixed(2)}</p>
        <input type="text" placeholder="Enter promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="border p-2 rounded mr-2 mt-2" />
        <Button onClick={applyPromo} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold">Apply Promo</Button>
        {discount > 0 && <p className="mt-2 text-green-600 font-semibold">Discount applied! New total: ${discountedTotal}</p>}

        <div className="mt-6">
          <h4 className="text-lg font-bold mb-2">Payment Options</h4>
          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Pay with PayPal</Button>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white">Pay with Credit Card</Button>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-pink-100 p-6 rounded-xl shadow">
        <h3 className="text-2xl font-bold text-rose-700 mb-2">Contact Us</h3>
        <p>Email: support@hangingsheaven.com</p>
        <p>Phone: +1 (800) 555-1234</p>
        <p>Follow us on Instagram @HangingsHeaven</p>
      </div>

      <footer className="mt-16 text-center text-sm text-rose-400">
        &copy; 2025 Hangings Heaven. Crafted with love and color.
      </footer>
    </div>
  );
}
