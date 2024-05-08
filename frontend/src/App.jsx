import { Box, Container } from "@chakra-ui/react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import { SettingsPage } from "./pages/SettingsPage";

import PageLayout from "./layouts/PageLayout/PageLayout";
import AdminPage from "./pages/Admin/AdminPage";
import UserManagerPage from "./pages/Admin/UserManagerPage";
import ProductManagerPage from "./pages/Admin/ProductManagerPage";
import OrderManagerPage from "./pages/Admin/OrderManagerPage";

import ShoppingPage from "./pages/ShoppingPage";

import NotFoundPage from "./pages/NotFoundPage";
import AboutUsPage from "./pages/AboutUsPage";
import ProductDetailPage from "./pages/Shopping/ProductDetailPage";
import NotificationPage from "./pages/NotificationPage";
import CartPage from "./pages/Shopping/CartPage";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();
  return (
    <>
      <PageLayout>
        <Box position={"relative"} w="full">
          <Container
            maxW={pathname === "/" ? { base: "900px", md: "1800px" } : "1000px"}
            // maxW={pathname === "/" ? { base: "760px", md: "1000px" } : "900px"}
            // maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}
          >
            <Header />

            <Routes>
              <Route
                path="/"
                element={user ? <HomePage /> : <Navigate to="/auth" />}
              />
              <Route
                path="/auth"
                element={!user ? <AuthPage /> : <Navigate to="/" />}
              />
              <Route
                path="/update"
                element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
              />

              <Route
                path="/:username"
                element={
                  user ? (
                    <>
                      <UserPage />
                      <CreatePost />
                    </>
                  ) : (
                    <UserPage />
                  )
                }
              />
              <Route path="/:username/post/:pid" element={<PostPage />} />
              <Route
                path="/chat"
                element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
              />
              <Route
                path="/settings"
                element={user ? <SettingsPage /> : <Navigate to={"/auth"} />}
              />
               <Route
                path="/notification"
                element={user ? <NotificationPage /> : <Navigate to={"/auth"} />}
              />
              <Route
                path="/shopping"
                element={user ? <ShoppingPage /> : <Navigate to={"/auth"} />}
              />

              <Route
                path="/product/:id"
                element={
                  user ? <ProductDetailPage /> : <Navigate to={"/auth"} />
                }
              />

              <Route
                path="/cart"
                element={user ? <CartPage /> : <Navigate to={"/auth"} />}
              />
              <Route
                path="/admin"
                element={user ? <AdminPage /> : <Navigate to={"/auth"} />}
              />
              <Route
                path="/admin/userManager"
                element={user ? <UserManagerPage /> : <Navigate to={"/auth"} />}
              />
              <Route
                path="/admin/productManager"
                element={
                  user ? <ProductManagerPage /> : <Navigate to={"/auth"} />
                }
              />
              <Route
                path="/admin/orderManager"
                element={
                  user ? <OrderManagerPage /> : <Navigate to={"/auth"} />
                }
              />
              <Route
                path="/aboutUs"
                element={user ? <AboutUsPage /> : <Navigate to={"/auth"} />}
              />

              <Route
                path="/notfound"
                element={user ? <NotFoundPage /> : <Navigate to={"/auth"} />}
              />
            </Routes>
          </Container>
        </Box>
      </PageLayout>
    </>
  );
}

export default App;
