/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { Container, Wrapper, StatusWrapper } from './styles'
import { Select } from '../Select'
import { Toast } from '../Toast'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { IoMdArrowForward } from 'react-icons/io'

export function OrderContent({ order, user }) {
  const navigate = useNavigate()

  const [initialStatus, setInitialStatus] = useState(order.status)
  const [selectedStatus, setSelectedStatus] = useState(order.status)

  // toast states
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  const selectValues = [
    { status: 'pending', value: 'pending', name: 'Pendente' },
    { status: 'preparing', value: 'preparing', name: 'Preparando' },
    { status: 'delivered', value: 'delivered', name: 'Entregue' },
  ]

  function renderFormattedDate(createdAt) {
    const [date, time] = createdAt.split(' ')
    const [year, month, day] = date.split('-')
    const [hour, minute, seconds] = time.split(':')

    return `${day}/${month} às ${hour}:${minute}`
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

  useEffect(() => {
    async function updateStatus() {
      setOpenToast(false)
      try {
        const response = await api.patch(`/orders/${order.id}`, {
          status: selectedStatus,
        })

        setToastTitle(response.data.status)
        setToastDescription(response.data.message)
        setOpenToast(true)
      } catch (error) {
        console.error(error)

        setToastTitle(error.response.data.status)
        setToastDescription(error.response.data.message)
        setOpenToast(true)
      }
    }

    if (selectedStatus !== initialStatus) {
      updateStatus()
      setInitialStatus(selectedStatus)
    }
  }, [selectedStatus, initialStatus, order.id])

  return (
    <>
      {openToast && (
        <Toast
          title={toastTitle}
          description={toastDescription}
          open={openToast}
        />
      )}
      <Container>
        <Wrapper to={`/order/${order.id}`}>
          <p>
            Pedido: <span>{order.id}</span>
          </p>
          <p>
            Criado em: <span>{renderFormattedDate(order.created_at)}</span>
          </p>
          <p>
            Pedido: <span>{renderOrderItems()}</span>
          </p>
          <button onClick={() => navigate(`/order/${order.id}`)}>
            Detalhes {<IoMdArrowForward />}
          </button>
        </Wrapper>

        {user.isAdmin ? (
          <Select
            title="Selecione o status do pedido"
            value={selectedStatus}
            onChange={setSelectedStatus}
            values={selectValues}
          />
        ) : (
          <>
            {order.status === 'pending' && (
              <StatusWrapper>
                <div data-status={order.status}></div>
                <p>Pendente</p>
              </StatusWrapper>
            )}

            {order.status === 'preparing' && (
              <StatusWrapper>
                <div data-status={order.status}></div>
                <p>Preparando</p>
              </StatusWrapper>
            )}

            {order.status === 'delivered' && (
              <StatusWrapper>
                <div data-status={order.status}></div>
                <p>Entregue</p>
              </StatusWrapper>
            )}
          </>
        )}
      </Container>
    </>
  )
}
