import { useState, useEffect } from 'react'
import { IoMdHeart, IoMdHeartEmpty, IoMdAdd, IoMdRemove } from 'react-icons/io'
import { PiPencilSimpleLight } from 'react-icons/pi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Toast } from '../Toast'
import { Button } from '../Button'
import { Container, ButtonMenu, Price, Stepper, Wrapper } from './styles'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { useCart } from '../../hooks/cart'
import { api } from '../../services/api'

export function Product({ product }) {
  const { user } = useAuth()

  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [isFavorite, setIsFavorite] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [stepperValue, setStepperValue] = useState(1)

  // control the toast
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  const productPath = `/product/${product.id}`
  const editPath = `/edit/${product.id}`

  const imageURL = `${api.defaults.baseURL}/files/${product.image}`

  async function handleAddFavorite() {
    setOpenToast(false)

    try {
      const response = await api.post('/favorites/', { product_id: product.id })
      setIsFavorite(true)
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

  async function handleRemoveFavorite() {
    setOpenToast(false)
    try {
      const response = await api.delete(`/favorites/${product.id}`)
      setIsFavorite(false)

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

  function handleAddProductToCart() {
    setOpenToast(false)

    const productToCart = {
      product_id: product.id,
      image: product.image,
      name: product.name,
      quantity: stepperValue,
      Unit_price: product.price,
    }

    const response = addToCart(productToCart)

    setToastTitle(response.status)
    setToastDescription(response.message)
    setOpenToast(true)
  }

  useEffect(() => {
    async function getFavorites() {
      const response = await api.get(`/favorites`)
      setFavorites(response.data)

      const favorite = favorites.find((item) => item.id === product.id)
      if (favorite) {
        setIsFavorite(true)
      }
    }
    getFavorites()
  })

  return (
    <>
      {openToast && (
        <Toast
          title={toastTitle}
          description={toastDescription}
          setOpenToast={setOpenToast}
        />
      )}

      <Container className="keen-slider__slide">
        {user.isAdmin ? (
          <ButtonMenu onClick={() => navigate(editPath)}>
            <PiPencilSimpleLight />
          </ButtonMenu>
        ) : (
          <ButtonMenu>
            {isFavorite ? (
              <IoMdHeart onClick={handleRemoveFavorite} />
            ) : (
              <IoMdHeartEmpty onClick={handleAddFavorite} />
            )}
          </ButtonMenu>
        )}

        <img src={imageURL} alt={product.name} />

        <Link to={productPath}>
          {product.name}
          <MdKeyboardArrowRight />
        </Link>

        <p>{product.description}</p>

        <Price>
          {(product.price / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Price>

        <Wrapper>
          {!user.isAdmin && (
            <Stepper>
              <button
                onClick={() => setStepperValue((prevState) => prevState - 1)}
              >
                <IoMdRemove />
              </button>

              <span>{String(stepperValue).padStart(2, '0')}</span>

              <button
                onClick={() => setStepperValue((prevState) => prevState + 1)}
              >
                <IoMdAdd />
              </button>
            </Stepper>
          )}

          {!user.isAdmin && (
            <Button title="Incluir" onClick={handleAddProductToCart} />
          )}
        </Wrapper>
      </Container>
    </>
  )
}
