import type { IProduct } from "@/types/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/feature/cartSlice";

const Home = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("/products.json");
            const data = await res.json();
            setProducts(data);
        }
        fetchProducts()
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Our Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 flex flex-col"
                    >
                        <Link to={`/product/${product.id}`}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex-1">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {product.title}
                                </h3>
                                <p className="text-blue-600 font-semibold">${product.price}</p>
                            </div>
                        </Link>

                        <div className="p-4 pt-0 mt-auto">
                            <Button
                                onClick={() => dispatch(addToCart(product))}
                                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold cursor-pointer"
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;