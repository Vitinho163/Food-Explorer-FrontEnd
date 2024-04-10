import { useState, useEffect } from 'react'
import {
  Container,
  Content,
  Wrapper,
  ProductInfo,
  Ingredients,
  CartSection,
  Stepper,
} from './styles'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { PiReceipt } from 'react-icons/pi'
import { BackButton } from '../../components/BackButton'
import { Ingredient } from '../../components/Ingredient'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { Toast } from '../../components/Toast'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { useCart } from '../../hooks/cart'

export function Product() {
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState({})
  const [stepperValue, setStepperValue] = useState(1)

  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  const imageURL = `${api.defaults.baseURL}/files/${product.image}`
  const buttonTitle = `pedir - ${(product.price / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })}`

  function handleAddToCart() {
    setOpenToast(false)

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: stepperValue,
    }

    addToCart(cartItem)

    setToastTitle('sucess')
    setToastDescription('item added to cart')
    setOpenToast(true)
  }

  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)
    }
    getProduct()
  })

  useEffect(() => {
    setTimeout(() => {
      setOpenToast(false)
    }, 2000)
  })

  return (
    <>
      {openToast && (
        <Toast
          open={openToast}
          description={toastDescription}
          title={toastTitle}
        />
      )}
      <Container>
        <Header />

        <Content>
          <BackButton />

          <Wrapper>
            <img src={imageURL} alt={product.title} />

            <ProductInfo>
              <h1>{product.title}</h1>
              <p>{product.description}</p>

              {product.ingredients && (
                <Ingredients>
                  {product.ingredients.map((ingredient) => (
                    <Ingredient key={ingredient.id} title={ingredient.name} />
                  ))}
                </Ingredients>
              )}

              <CartSection>
                {!user.isAdmin && (
                  <Stepper>
                    <button
                      onClick={() =>
                        setStepperValue((prevState) => prevState - 1)
                      }
                    >
                      <IoMdRemove />
                    </button>

                    <span>{String(stepperValue).padStart(2, '0')}</span>

                    <button
                      onClick={() =>
                        setStepperValue((prevState) => prevState + 1)
                      }
                    >
                      <IoMdAdd />
                    </button>
                  </Stepper>
                )}

                {user.isAdmin ? (
                  <Button
                    title="Editar prato"
                    onClick={() => navigate(`/edit/${product.id}`)}
                  />
                ) : (
                  <Button
                    icon={PiReceipt}
                    title={buttonTitle}
                    onClick={handleAddToCart}
                  />
                )}
              </CartSection>
            </ProductInfo>
          </Wrapper>
        </Content>

        <Footer />
      </Container>
    </>
  )
}
