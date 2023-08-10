import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import RequireAuth from "./hocs/RequireAuth"
import Layout  from "./Layout/Layout"

import MainPage from "./pages/MainPage"
import ItemPage from "./pages/ItemPage"
import CreatePage from "./pages/CreateItemPage"
import ErrorUserPage from "./pages/ErrorUserPage"
import ErrorPage from "./pages/ErrorPage"
import EditPage from "./pages/EditItemPage"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<MainPage />} />
    <Route path="/:id" element={<ItemPage />} />
    <Route path="/:id/edit" element={
      <RequireAuth>
        <EditPage />
      </RequireAuth>
    } />
    <Route path="/create" element={
      <RequireAuth>
        <CreatePage />
      </RequireAuth>
    } />
    <Route path="/create/test" element={<CreatePage />} />
    <Route path="/error-user" element={<ErrorUserPage />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Route>
))

export default router