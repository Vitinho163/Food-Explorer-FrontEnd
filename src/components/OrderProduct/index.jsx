import { FaTimes } from 'react-icons/fa'
import { api } from '../../services/api'
import { Container, Content, Wrapper } from './styles'

export function OrderProduct({ product, isNew, onClick }) {
  const productImageURL = `${api.defaults.baseURL}/files/${product.image}`

  return (
    <Container>
      <img src={productImageURL} alt={product.title} />

      <Content>
        <Wrapper>
          <p>
            {product.quantity} <FaTimes />
          </p>
          <h1>{product.name}</h1>
          <span>
            {product.Unit_price &&
              ((product.Unit_price / 100) * product.quantity).toLocaleString(
                'pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL',
                },
              )}
          </span>
        </Wrapper>

        {isNew && <button onClick={onClick}>Excluir</button>}
      </Content>
    </Container>
  )
}
