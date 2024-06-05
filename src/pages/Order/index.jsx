import { Container, Content, DesktopContent, MobileContent } from './styles'
import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/cart'
import { Header } from '../../components/Header'
import { OrderProduct } from '../../components/OrderProduct'
import { Button } from '../../components/Button'
import { Tabs } from '../../components/Tabs'
import { Toast } from '../../components/Toast'
import { Footer } from '../../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'

export function Order() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { cart, removeFromCart, removeAllFromCart } = useCart()
  const { user } = useAuth()

  // page state
  const [page, setPage] = useState('order')

  // order state
  const [orderItems, setOrderItems] = useState([])
  console.log('order', orderItems)

  // control the toast
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  // calculating total
  let total
  if (cart.length !== 0) {
    total = cart.reduce((sum, item) => {
      return sum + item.quantity * item.Unit_price
    }, 0)
  } else {
    total = orderItems.reduce((sum, item) => {
      return sum + item.quantity * item.price
    }, 0)
  }

  function handleRemoveFromCart(productId) {
    removeFromCart(productId)
  }

  async function handleNewOrder() {
    setOpenToast(false)

    try {
      const response = await api.post('/orders', { orderItems: cart })
      setToastTitle(response.data.message)
      setToastDescription(response.data.message)
      setOpenToast(true)

      setTimeout(() => {
        removeAllFromCart()
        navigate('/orders')
      }, 2000)
    } catch (error) {
      console.error(error)

      setToastTitle(error.response.data.status)
      setToastDescription(error.response.data.message)
      setOpenToast(true)
    }
  }

  // to get order from api if id is present
  useEffect(() => {
    if (id) {
      async function fetchOrder() {
        const response = await api.get(`/orders/${id}`)
        setOrderItems(response.data.order.orderItems)
        setPage(response.data.order.status)
      }
      fetchOrder()
    }
  }, [id])

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
        <Header />

        <MobileContent>
          {cart.length === 0 && !id && (
            <Content>
              <h3>Seu pedido está vazio.</h3>
              <p>
                Adicione produtos clicando no botão{' '}
                <strong>&quot;Incluir&quot;</strong> na página inicial ou do
                produto.
              </p>
            </Content>
          )}

          {cart.length !== 0 && page === 'order' && (
            <Content>
              <h1>Meu pedido</h1>
              {cart.map((cartItem) => (
                <OrderProduct
                  key={cartItem.product_id}
                  product={cartItem}
                  isNew
                  onClick={() => handleRemoveFromCart(cartItem.product_id)}
                />
              ))}
              <h2>
                Total:{' '}
                {(total / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </h2>

              <Button title="Avançar" onClick={() => setPage('payment')} />
            </Content>
          )}

          {(cart.length !== 0 || id) &&
            (page === 'payment' ||
              page === 'pending' ||
              page === 'preparing' ||
              page === 'delivered') &&
            (user.isAdmin ? (
              <Content>
                <h1>Detalhes</h1>
                {orderItems.map((order) => (
                  <OrderProduct key={order.id} product={order} />
                ))}
                <h2>
                  Total:{' '}
                  {(total / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </h2>
              </Content>
            ) : (
              <Content>
                <h1>Pagamento</h1>
                <Tabs page={page} onClick={handleNewOrder} />
              </Content>
            ))}
        </MobileContent>

        <DesktopContent>
          {cart.length === 0 && !id && (
            <Content>
              <h3>Seu pedido está vazio.</h3>
              <p>
                Adicione produtos clicando no botão{' '}
                <strong>&quot;Incluir&quot;</strong> na página inicial ou do
                produto.
              </p>
            </Content>
          )}

          {cart.length !== 0 && (page === 'order' || page === 'payment') && (
            <Content>
              <h1>Meu pedido</h1>
              {cart.length !== 0 &&
                cart.map((cartItem) => (
                  <OrderProduct
                    key={cartItem.product_id}
                    isNew
                    product={cartItem}
                    onClick={() => handleRemoveFromCart(cartItem.product_id)}
                  />
                ))}

              <h2>
                Total:{' '}
                {(total / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </h2>
            </Content>
          )}

          {cart.length === 0 && orderItems.length !== 0 && (
            <Content>
              <h1>Detalhes do pedido</h1>
              {orderItems.map((order) => (
                <OrderProduct key={order.id} product={order} />
              ))}
              <h2>
                Total:{' '}
                {(total / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </h2>
            </Content>
          )}

          {(cart.length !== 0 || id) &&
            (page === 'order' ||
              page === 'payment' ||
              page === 'pending' ||
              page === 'preparing' ||
              page === 'delivered') && (
              <Content>
                <h1>Pagamento</h1>
                <Tabs page={page} onClick={handleNewOrder} />
              </Content>
            )}
        </DesktopContent>
        <Footer />
      </Container>
    </>
  )
}
