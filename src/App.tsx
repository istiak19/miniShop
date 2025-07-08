import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import CartSidebar from "./components/CartSidebar/CartSidebar";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <>
      <Navbar toggleCart={toggleCart} />
      <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} />
      <main className="pt-4">
        <Outlet />
      </main>
    </>
  );
};

export default App;