import { useState, useEffect } from 'react'
import BannerImg from '../../assets/BannerImg.svg'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Container, Banner, Wrapper } from './styles'
import { Session } from '../../components/Session'
import { Toast } from '../../components/Toast'
import { api } from '../../services/api'
import { useCart } from '../../hooks/cart'

export function Home() {
  const { addToCart } = useCart()
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

  // control the toast
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  const filteredFoodProducts = products.filter(
    (product) => product.category === 'food',
  )

  const filteredDessertProducts = products.filter(
    (product) => product.category === 'dessert',
  )

  const filteredDrinkProducts = products.filter(
    (product) => product.category === 'drink',
  )

  async function handleAddFavorite(product) {
    setOpenToast(false)

    try {
      const response = await api.post(`/favorites/`, { product_id: product.id })

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

  async function handleRemoveFavorite(product) {
    setOpenToast(false)

    try {
      const response = await api.delete(`/favorites/${product.id}`)

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

  function handleAddProductToCart(product, stepperValue) {
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
    async function getProducts() {
      // Cria duas promessas para as requisições
      const fetchByName = api
        .get(`/products?name=${search}`)
        .then((response) => response.data)
        .catch(() => [])
      const fetchByIngredient = api
        .get(`/products?ingredient=${search}`)
        .then((response) => response.data)
        .catch(() => [])

      // Usa Promise.all para resolver ambas as promessas
      const results = await Promise.all([fetchByName, fetchByIngredient])

      // Combina os arrays resultantes, filtrando duplicatas
      const combinedResults = [...results[0], ...results[1]].reduce(
        (acc, current) => {
          const x = acc.find((item) => item.id === current.id)
          if (!x) {
            return acc.concat([current])
          } else {
            return acc
          }
        },
        [],
      )

      // Atualiza o estado com os produtos combinados
      setProducts(combinedResults)
    }

    getProducts()
  }, [search])

  return (
    <>
      {openToast && (
        <Toast
          title={toastTitle}
          description={toastDescription}
          setOpenToast={setOpenToast}
        />
      )}

      <Container>
        <Header onChange={setSearch} />
        {search === '' && (
          <Banner>
            <img src={BannerImg} alt="Imagem do banner" />
            <div>
              <h2>Sabores inigualáveis</h2>
              <p>Sinta o cuidado do preparo com ingredientes selecionados.</p>
            </div>
          </Banner>
        )}

        <Wrapper>
          {filteredFoodProducts.length > 0 && (
            <Session
              title="Refeições"
              products={filteredFoodProducts}
              addFavorite={handleAddFavorite}
              removeFavorite={handleRemoveFavorite}
              addProductToCart={handleAddProductToCart}
            />
          )}

          {filteredDessertProducts.length > 0 && (
            <Session
              title="Sobremesas"
              products={filteredDessertProducts}
              addFavorite={handleAddFavorite}
              removeFavorite={handleRemoveFavorite}
              addProductToCart={handleAddProductToCart}
            />
          )}

          {filteredDrinkProducts.length > 0 && (
            <Session
              title="Bebidas"
              products={filteredDrinkProducts}
              addFavorite={handleAddFavorite}
              removeFavorite={handleRemoveFavorite}
              addProductToCart={handleAddProductToCart}
            />
          )}
        </Wrapper>

        <Footer />
      </Container>
    </>
  )
}
