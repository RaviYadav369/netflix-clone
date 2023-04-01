import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import {useState} from 'react'
import { AuthProvider, useAuth } from "./common/auth";
import Layout from "./component/Layout";
import Login from "./component/Login";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import Profiles from "./component/Profiles";

function ProtectRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  // const [isLoggedIn, setisLoggedIn] = useState(false)
  // if(user){
  //   setisLoggedIn(true)
  // }
  // else{
  //   setisLoggedIn(false)
  // }
  // console.log(user);

  
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }
  return children;
}

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Outlet />
            </ProtectRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="manageprofile" element={<Profile edit />} />
          <Route path="browse" element={<Layout />}>
            <Route index element={<Browse />}></Route>
          </Route>
          <Route path="latest" element={<Layout />}>
            <Route index element={<h1>Latest</h1>} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
