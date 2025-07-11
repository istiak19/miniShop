import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const Navbar = ({ toggleCart }: { toggleCart: () => void }) => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "!text-blue-500 font-semibold !bg-transparent"
            : "text-black hover:text-blue-500 hover:!bg-transparent transition";

    const links = (
        <>
            <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
            {/* Cart Button triggers toggleCart */}
            <li>
                <button
                    onClick={toggleCart}
                    className="relative text-black hover:text-blue-500 transition"
                >
                    🛒 Cart
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {totalQuantity}
                        </span>
                    )}
                </button>
            </li>
        </>
    );

    return (
        <nav className="bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar w-11/12 mx-auto">
                {/* Navbar Start */}
                <div className="navbar-start">
                    {/* Mobile Dropdown */}
                    <div className="dropdown">
                        <button
                            tabIndex={0}
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>

                    <Link to="/" className="text-xl font-semibold text-blue-500">
                        MiniShop
                    </Link>
                </div>

                {/* Navbar End */}
                <div className="navbar-end">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;