import { Routes, Route } from 'react-router-dom'

// pages
import { Home } from '../pages/Home'
import { Product } from '../pages/Product'
import { Favorites } from '../pages/Favorites'
import { Order } from '../pages/Order'
import { Orders } from '../pages/Orders'
import { NotFound } from '../pages/NotFound'

export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/order" element={<Order />} />
      <Route path="/order/:id" element={<Order />} />
      <Route path="/orders" element={<Orders />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
