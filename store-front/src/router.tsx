import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Home from "./pages/home";
import { StoreProvider } from "./providers/store-provider";
import ProductDescriptionPage from "./pages/product-description";
import { getProductById } from "./lib/mock-data";
import CustomerCartPage from "./pages/customer-cart";
import WishlistPage from "./pages/wishlist";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <StoreProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </StoreProvider>
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const productDescriptionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  loader: ({ params }) => {
    const product = getProductById(params.id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  },
  component: ProductDescriptionPage,
  errorComponent: () => <div>Product not found</div>,
});

const customerCartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CustomerCartPage,
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: WishlistPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productDescriptionRoute,
  customerCartRoute,
  wishlistRoute,
]);

export const router = createRouter({ routeTree });
