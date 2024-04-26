import { useState, useEffect } from 'react'
import { IoMdHeart, IoMdHeartEmpty, IoMdAdd, IoMdRemove } from 'react-icons/io'
import { PiPencilSimpleLight } from 'react-icons/pi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Button } from '../Button'
import { Container, ButtonMenu, Price, Stepper, Wrapper } from './styles'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'

export function Product({
  product,
  addFavorite,
  removeFavorite,
  addProductToCart,
}) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [isFavorite, setIsFavorite] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [stepperValue, setStepperValue] = useState(1)

  const productPath = `/product/${product.id}`
  const editPath = `/edit/${product.id}`

  const imageURL = `${api.defaults.baseURL}/files/${product.image}`

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
  }, [isFavorite, favorites, product.id])

  return (
    <Container>
      {user.isAdmin ? (
        <ButtonMenu onClick={() => navigate(editPath)}>
          <PiPencilSimpleLight />
        </ButtonMenu>
      ) : (
        <ButtonMenu>
          {isFavorite ? (
            <IoMdHeart
              onClick={() => {
                removeFavorite(product)
                setIsFavorite(false)
              }}
            />
          ) : (
            <IoMdHeartEmpty
              onClick={() => {
                addFavorite(product)
                setIsFavorite(true)
              }}
            />
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
          <Button
            title="Incluir"
            onClick={() => addProductToCart(product, stepperValue)}
          />
        )}
      </Wrapper>
    </Container>
  )
}
