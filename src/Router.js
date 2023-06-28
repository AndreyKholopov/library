import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import Layout from "./components/Layout"

import MainPage from "./pages/MainPage"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<MainPage />} />
    <Route path="*" element={<MainPage />} />
  </Route>
))

export default router