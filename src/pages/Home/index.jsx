import { useState, useEffect } from 'react'
import BannerImg from '../../assets/BannerImg.svg'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Container, Banner, Wrapper } from './styles'
import { Session } from '../../components/Session'
import { api } from '../../services/api'

export function Home() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

  const filteredFoodProducts = products.filter(
    (product) => product.category === 'food',
  )

  const filteredDessertProducts = products.filter(
    (product) => product.category === 'dessert',
  )

  const filteredDrinkProducts = products.filter(
    (product) => product.category === 'drink',
  )

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`/products?name=${search}`)
      setProducts(response.data)
    }
    getProducts()
  }, [search])

  return (
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
          <Session title="Refeições" products={filteredFoodProducts} />
        )}

        {filteredDessertProducts.length > 0 && (
          <Session title="Sobremesas" products={filteredDessertProducts} />
        )}

        {filteredDrinkProducts.length > 0 && (
          <Session title="Bebidas" products={filteredDessertProducts} />
        )}
      </Wrapper>

      <Footer />
    </Container>
  )
}
