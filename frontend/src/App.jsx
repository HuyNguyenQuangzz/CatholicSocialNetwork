import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import AdminPage from "./pages/AdminPage";
import ShoppingPage from "./pages/ShoppingPage";
import CartPage from "./pages/CartPage";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <Box position={"relative"} w="full">
        <Container
          maxW={pathname === "/" ? { base: "900px", md: "1800px" } : "900px"}
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
              path="/shopping"
              element={user ? <ShoppingPage /> : <Navigate to={"/auth"} />}
            />
            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to={"/auth"} />}
            />
            <Route
              path="/admin"
              element={user ? <AdminPage /> : <Navigate to={"/auth"} />}
            />
          </Routes>
        </Container>
      </Box>
    </PageLayout>
  );
}

export default App;
