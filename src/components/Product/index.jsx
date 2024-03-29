import { useState, useEffect } from 'react'
import { IoMdHeart, IoMdHeartEmpty, IoMdAdd, IoMdRemove } from 'react-icons/io'
import { PiPencilSimpleLight } from 'react-icons/pi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Toast } from '../Toast'
import { Button } from '../Button'
import { Container, ButtonMenu, Price, Stepper, Wrapper } from './styles'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'

export function Product({ product }) {
  const { user } = useAuth()

  const [isFavorite, setIsFavorite] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [stepperValue, setStepperValue] = useState(1)

  // control the toast
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  const navigate = useNavigate()
  const productPath = `/product/${product.id}`
  const editPath = `/edit/${product.id}`

  const imageURL = `${api.defaults.baseURL}/files/${product.image}`

  function handleAddFavorite() {
    setOpenToast(false)
    setIsFavorite(true)
    setToastTitle('Sucesso')
    setToastDescription('Item adicionado aos favoritos com sucesso!')
    setOpenToast(true)
  }

  function handleRemoveFavorite() {
    setOpenToast(false)
    setIsFavorite(false)
    setToastTitle('Sucesso')
    setToastDescription('Item removido dos favoritos.')
    setOpenToast(true)
  }

  useEffect(() => {
    async function getFavorites() {
      const response = await api.get(`/favorites`)
      setFavorites(response.data)

      const favorite = response.data.find((item) => item.id === product.id)
      if (favorite) {
        setIsFavorite(true)
      }
    }
    getFavorites()
  })

  useEffect(() => {
    setTimeout(() => {
      setOpenToast(false)
    }, 2000)
  }, [isFavorite])

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
          <span>R$ </span>
          <span>{String(product.price / 100).replace('.', ',')}</span>
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

          {!user.isAdmin && <Button title="Adicionar" />}
        </Wrapper>
      </Container>
    </>
  )
}
