import { RouterProvider,createRoutesFromElements, Route, createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout";
import Browse from "./pages/Browse";
function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<h1 className="text-2xl">Hello</h1>} />
      <Route path="/login" element={<h1>login</h1>} />
      <Route path="/browse" element={<Layout />} >
        <Route index element={<Browse />} ></Route>
      </Route>
      <Route path="/latest" element={<Layout />}>
        <Route index element={<h1>Latest</h1>} />
      </Route>
      
      </>
    )
  )
  return <RouterProvider router={router} ></RouterProvider>
}

function App() {
  return <AppRouter />;
}

export default App;
