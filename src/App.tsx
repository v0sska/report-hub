import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import AuthPage from './pages/AuthPage'
import SalesPage from './pages/SalesPage'
import CustomerPage from './pages/CustomerPage'
import PrivateRoutes from './guard/PrivateRoutes'
import DeveloperPage from './pages/DeveloperPage'
import CreateAccountPage from './pages/CreateAccountPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route path="/profile-sale" element={<SalesPage />} />
        <Route path="/profile-dev" element={<DeveloperPage />} />
        <Route path="/customer/:id" element={<CustomerPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Route>

      <Route index element={<AuthPage />} />
    </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
