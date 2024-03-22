import { useState } from 'react'
import BannerImg from '../../assets/BannerImg.svg'
import { Header } from '../../components/Header'
import { Container, Banner } from './styles'
import { Product } from '../../components/Product'

export function Home() {
  const [search, setSeach] = useState('')
  console.log(search)

  const product = {
    id: 1,
    name: 'Tesde Name',
    price: 2947,
    description: 'Teste description',
    image: 'https://source.unsplash.com/random',
  }

  return (
    <Container>
      <Header onChange={setSeach} />
      <Banner>
        <img src={BannerImg} alt="Imagem de Frutas" />
        <div>
          <h2>Sabores inigualáveis</h2>
          <p>Sinta o cuidado do preparo com ingredientes selecionados</p>
        </div>
      </Banner>
      <Product product={product} />
    </Container>
  )
}
