import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import MyAccount from "./pages/myAccount/MyAccount";
import Product from "./pages/product/Product";
import Explore from "./pages/explore/Explore";
import Reviews from "./pages/reviews/Reviews";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Discount from "./pages/discount/Discount";
import Success from "./pages/success/Success";
import Register from "./pages/register/Register";
import ScrollToTop from "./scrollToTop";
import Login from "./pages/login/Login";
import Wishlist from "./pages/wishlist/Wishlist";
import Empty_Cart from "./pages/cart/Empty_Cart";
import Empty_Wishlist from "./pages/wishlist/Empty_Wishlist";
import Gallery from "./pages/gallery/Gallery";
import Update from "./pages/update/Update";
function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const user = currentUser ? true : false;
  const userId = user ? currentUser._id : null;
  // console.log(user);
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Layout />
        </>
      ),
      children: [
        {
          path: "/:category",
          element: <Home />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Sofa",
          element: <Home categories="Sofa" />,
        },
        {
          path: "/Bed",
          element: <Home categories="Bed" />,
        },
        {
          path: "/Chair",
          element: <Home categories="Chair" />,
        },
        {
          path: "/Table",
          element: <Home categories="Table" />,
        },
        {
          path: "/Decorations",
          element: <Home categories="Decorations" />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/wishlist/:id",
          element: !user ? <Navigate to="/register" replace /> : <Wishlist />,
        },
        {
          path: "/myAccount",
          element: !user ? <Navigate to="/register" replace /> : <MyAccount />,
        },
        {
          path: "/reviews",
          element: <Reviews />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/cart/:userId",
          element: !user ? <Navigate to="/register" replace /> : <Cart />,
        },
        {
          path: "/emptycart",
          element: <Empty_Cart />,
        },
        ,
        {
          path: "/emptywishlist",
          element: <Empty_Wishlist />,
        },
        {
          path: "/checkout",
          element: !user ? <Navigate to="/register" replace /> : <Checkout />,
        },
        {
          path: "/discount",
          element: <Discount />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/update",
          element: <Update />,
        },
        {
          path: "/success",
          element: !user ? <Navigate to="/register" replace /> : <Success />,
        },
      ],
    },
  ]);

  return (
    <div>
      {/* <ScrollToTop /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
