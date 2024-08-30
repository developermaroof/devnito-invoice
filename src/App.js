import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  // {
  //   path: "/about",
  //   element: <About></About>,
  // },
  // {
  //   path: "/contact",
  //   element: <Contact></Contact>,
  // },
  // {
  //   path: "/projects",
  //   element: <Projects></Projects>,
  // },
  // {
  //   path: "/services",
  //   element: <Services></Services>,
  // },
  // {
  //   path: "/faqs",
  //   element: <FaQs></FaQs>,
  // },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
