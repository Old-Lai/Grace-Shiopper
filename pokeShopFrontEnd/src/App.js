import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css'
import {Login, Products, NotFound, Admin, Register, Home, SingleProductView} from "./routes"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <NotFound/>,
    children: [
      {
        path: "Login",
        element:  <Login/>,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Products />,

      },
      {
        path: "admin",
        element: <Admin/>,
      },
      {
        path: "/:productId",
        element: <SingleProductView />,
      },
    ],
  },
]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
