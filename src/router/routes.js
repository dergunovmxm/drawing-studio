import { createBrowserRouter } from "react-router";
import { Component, lazy } from "react";

const Layout = lazy(() => import("../App"));
const About = lazy(() => import("../pages/About"));
const Main = lazy(() => import("../pages/Main"));
const Gallery = lazy(() => import("../pages/Gallery"));
const GallerySection = lazy(() => import("../pages/Gallery/GallerySection"));
const Contacts = lazy(() => import("../pages/Contacts"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: Main },
      { path: "about", Component: About },
      { path: "gallery", Component: Gallery },
      { path: "gallery/:alias", Component: GallerySection },
      { path: "contacts", Component: Contacts },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default router;
