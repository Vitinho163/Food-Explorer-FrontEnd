import { Container, Title } from './styles'
import { Carousel } from '../Carousel'

export function Session({
  title,
  products,
  addFavorite,
  removeFavorite,
  addProductToCart,
}) {
  const OPTIONS = { align: 'start', dragFree: true, loop: true }

  return (
    <Container>
      <Title>{title}</Title>
      <Carousel
        options={OPTIONS}
        products={products}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        addProductToCart={addProductToCart}
      />
    </Container>
  )
}
