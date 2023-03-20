import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css'
import {Login, Products, NotFound, Admin, Register, Home} from "./routes"

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
        path: "Profile",
        element: <Admin/>,
      }
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
