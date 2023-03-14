import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import './index.css'
import Home from "./routes/Home";
import Register from "./routes/Register";
import {Login} from "./routes"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    //errorElement: <NotFound/>,
    children: [
      {
        path: "Login",
        element:  <Login/>,
      },
      {
        path: "Register",
        element: <Register />,
      },
      // {
      //   path: "Posts",
      //   element: <Posts />,
      // },
      // {
      //   path: "Profile",
      //   element: <Profile />,
      // }
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
