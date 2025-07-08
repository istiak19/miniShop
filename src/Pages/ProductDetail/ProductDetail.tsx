import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { IProduct } from "@/types/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/feature/cartSlice";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch("/products.json");
            const data: IProduct[] = await res.json();
            const selectedProduct = data.find((p) => p.id === Number(id));
            setProduct(selectedProduct || null);
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="text-center py-20 text-gray-500">Loading product...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="w-full">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-md"
                />
            </div>
            <div className="space-y-5">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>
                <p className="text-2xl text-blue-600 font-semibold">${product.price}</p>
                <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                    <li>In Stock</li>
                    <li>Free shipping</li>
                    <li>30-day return policy</li>
                </ul>
                <div>
                    <Button
                        onClick={() => dispatch(addToCart(product))}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium w-full md:w-auto px-6 py-2"
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;