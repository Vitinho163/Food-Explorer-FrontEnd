import { useState, useEffect } from 'react'
import BannerImg from '../../assets/BannerImg.svg'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Container, Banner, Wrapper } from './styles'
import { Product } from '../../components/Product'
import { Session } from '../../components/Session'
import { api } from '../../services/api'

export function Home() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

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
        {products.filter((product) => product.category === 'food').length >
          0 && (
          <Session title="Refeições">
            {products.map(
              (product) =>
                product.category === 'food' && (
                  <Product key={product.id} product={product} />
                ),
            )}
          </Session>
        )}

        {products.filter((product) => product.category === 'dessert').length >
          0 && (
          <Session title="Sobremesas">
            {products.map(
              (product) =>
                product.category === 'dessert' && (
                  <Product key={product.id} product={product} />
                ),
            )}
          </Session>
        )}

        {products.filter((product) => product.category === 'drink').length >
          0 && (
          <Session title="Bebidas">
            {products.map(
              (product) =>
                product.category === 'drink' && (
                  <Product key={product.id} product={product} />
                ),
            )}
          </Session>
        )}
      </Wrapper>

      <Footer />
    </Container>
  )
}
