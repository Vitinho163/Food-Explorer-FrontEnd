/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from './styles'
import { useNavigate } from 'react-router-dom'

export function TableRow({ order }) {
  const navigate = useNavigate()

  function renderFormattedDate(createdAt) {
    const [date, time] = createdAt.split(' ')
    const [year, month, day] = date.split('-')
    const [hour, minute, seconds] = time.split(':')

    return `${day}/${month}/${year} às ${hour}:${minute}`
  }

  function renderOrderItems() {
    if (order && order.orderItems && order.orderItems.length > 0) {
      return order.orderItems.map((item, index) => (
        <span key={item.id}>
          {`${item.quantity} x ${item.name}${index === order.orderItems.length - 1 ? '' : ', '}`}
        </span>
      ))
    } else {
      return <span>Nenhum item no pedido</span>
    }
  }

  return (
    <Container>
      <td>{order.status}</td>
      <td>{order.id}</td>
      <td>{renderOrderItems()}</td>
      <td>{renderFormattedDate(order.created_at)}</td>
      <td>
        <button onClick={() => navigate(`/order/${order.id}`)}>Detalhes</button>
      </td>
    </Container>
  )
}
