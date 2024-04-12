import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { FavoriteProduct } from '../../components/FavoriteProduct'
import { Footer } from '../../components/Footer'
import { Toast } from '../../components/Toast'
import { api } from '../../services/api'
import { Container, Content, Wrapper } from './styles'

export function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  async function handleRemoveFavoriteProduct(id) {
    setOpenToast(false)

    try {
      await api.delete(`/favorites/${id}`)

      setToastTitle('sucess')
      setToastDescription('Product removed from favorites')
      setOpenToast(true)
    } catch (error) {
      setToastTitle('Error')
      setToastDescription('Error when removing product from favorites')
      setOpenToast(true)
    }
  }

  useEffect(() => {
    async function getFavorites() {
      const response = await api.get('/favorites')
      setFavorites(response.data)
    }
    getFavorites()
  }, [favorites])

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

        <Content>
          <h1>Meus favoritos</h1>
          <Wrapper>
            {favorites &&
              favorites.map((product) => (
                <FavoriteProduct
                  key={product.id}
                  product={product}
                  onClick={() => handleRemoveFavoriteProduct(product.id)}
                />
              ))}
          </Wrapper>
        </Content>
        <Footer />
      </Container>
    </>
  )
}
