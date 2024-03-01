import { BrowserRouter } from 'react-router-dom'

import { useAuth } from '../hooks/auth'
import { AuthRoutes } from './auth.routes'
import { AdminRoutes } from './admin.routes'
import { CustomerRoutes } from './customer.routes'

export function Routes() {
  const { user } = useAuth()

  function AccessRoutes() {
    if (user.isAdmin) {
      return <AdminRoutes />
    } else {
      return <CustomerRoutes />
    }
  }

  return (
    <BrowserRouter>{user ? <AccessRoutes /> : <AuthRoutes />}</BrowserRouter>
  )
}
