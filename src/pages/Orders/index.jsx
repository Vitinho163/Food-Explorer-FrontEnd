import { useEffect, useState } from 'react'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { OrderContent } from '../../components/OrderContent'
import { TableRow } from '../../components/TableRow'
import { useAuth } from '../../hooks/auth'
import { Container, Content, DesktopWrapper, MobileWrapper } from './styles'
import { api } from '../../services/api'

export function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  console.log(orders)

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/orders')
      setOrders(response.data.message)
      console.log(response.data)
    }
    loadOrders()
  }, [])

  return (
    <Container>
      <Header />

      <Content>
        <h1>Pedidos</h1>

        <MobileWrapper>
          {orders &&
            orders.map((order) => (
              <OrderContent key={order.id} order={order} user={user} />
            ))}
        </MobileWrapper>

        <DesktopWrapper>
          <thead>
            <tr>
              <th>Status</th>
              <th>Código</th>
              <th>Itens</th>
              <th>Data e hora</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => <TableRow key={order.id} order={order} />)}
          </tbody>
        </DesktopWrapper>
      </Content>
      <Footer />
    </Container>
  )
}
