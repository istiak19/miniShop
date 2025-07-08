import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/redux/store";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "@/redux/feature/cartSlice";

const CartSidebar = ({
    isOpen,
    toggleCart,
}: {
    isOpen: boolean;
    toggleCart: () => void;
}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <div>
            <div
                className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 cursor-pointer ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={toggleCart}
            />
            <aside
                className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    } flex flex-col`}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button
                        onClick={toggleCart}
                        className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                    >
                        <IoIosCloseCircleOutline />
                    </button>
                </div>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.product.id}
                                className="flex items-center justify-between gap-2 border-b py-3"
                            >
                                {/* Product Info */}
                                <div className="flex items-center gap-3 w-2/3">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                        className="w-14 h-14 object-cover rounded-md"
                                    />
                                    <div className="flex flex-col text-sm">
                                        <p className="font-medium line-clamp-1">{item.product.title}</p>
                                        <p className="text-blue-600 font-semibold">
                                            ${item.product.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                {/* Quantity Control */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            dispatch(decreaseQuantity(item.product.id))
                                        }
                                        className="bg-gray-200 hover:bg-gray-300 px-2 rounded cursor-pointer"
                                    >
                                        −
                                    </button>
                                    <span className="min-w-[20px] text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            dispatch(increaseQuantity(item.product.id))
                                        }
                                        className="bg-gray-200 hover:bg-gray-300 px-2 rounded cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                                {/* Remove */}
                                <button
                                    onClick={() => dispatch(removeFromCart(item.product.id))}
                                    className="text-sm text-red-600 hover:underline cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t p-4">
                        <div className="flex justify-between mb-3 text-lg font-semibold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-400 cursor-pointer text-white">
                            Checkout
                        </Button>
                    </div>
                )}
            </aside>
        </div>
    );
};

export default CartSidebar;