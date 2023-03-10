import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./routes/Login";
import './index.css'
import Home from "./routes/Home";
import Register from "./routes/Register";
//import Profile from "./routes/Profile";
//import Posts from "./routes/Posts";
//import NotFound from "./routes/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    //errorElement: <NotFound/>,
    children: [
      // {
      //   path: "Login",
      //   element:  <Login/>,
      // },
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
