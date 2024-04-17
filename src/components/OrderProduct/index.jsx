import { FaTimes } from 'react-icons/fa'
import { api } from '../../services/api'
import { Container, Content, Wrapper } from './styles'

export function OrderProduct({ product, onClick }) {
  const productImageURL = `${api.defaults.baseURL}/files/${product.image}`

  return (
    <Container>
      <img src={productImageURL} alt={product.title} />

      <Content>
        <Wrapper>
          <p>
            {product.quantity} <FaTimes />
          </p>
          <h1>{product.title}</h1>
          <span>
            {((product.price / 100) * product.quantity).toLocaleString(
              'pt-BR',
              {
                style: 'currency',
                currency: 'BRL',
              },
            )}
          </span>
        </Wrapper>

        <button onClick={onClick}>Excluir</button>
      </Content>
    </Container>
  )
}
