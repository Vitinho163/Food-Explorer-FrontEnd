import { Container } from './styles'
import { Logo } from '../../components/Logo'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <Container>
      <Logo />
      <h1>404 - Página não encontrada</h1>
      <Link to="/">Voltar para a página inicial</Link>
    </Container>
  )
}
