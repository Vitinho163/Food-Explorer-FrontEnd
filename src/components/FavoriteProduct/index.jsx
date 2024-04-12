import { Container, Wrapper } from './styles'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'

export function FavoriteProduct({ product, onClick }) {
  const imageURL = `${api.defaults.baseURL}/files/${product.image}`

  return (
    <Container>
      <img src={imageURL} alt={product.name} />

      <Wrapper>
        <Link to={`/product/${product.id}`}>{product.name}</Link>
        <button onClick={onClick}>Remover dos Favoritos</button>
      </Wrapper>
    </Container>
  )
}
