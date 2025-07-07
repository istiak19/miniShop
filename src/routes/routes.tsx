import App from "@/App";
import Home from "@/Pages/Home/Home";
import ProductDetail from "@/Pages/ProductDetail/ProductDetail";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/product/:id",
                Component: ProductDetail
            }
        ]
    },
]);

export default router;