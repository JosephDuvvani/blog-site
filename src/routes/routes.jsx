import App from "../App";
import Home from "../pages/home";
import Login from "../pages/login";
import Post from "../pages/post";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/posts/:postId',
        element: <Post />
      }
    ],
  },
];

export default routes;
