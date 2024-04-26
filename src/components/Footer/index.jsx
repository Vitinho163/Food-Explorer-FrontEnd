import { Container } from './styles'
import FooterLogo from '../../assets/FooterLogo.svg'

export function Footer() {
  return (
    <Container>
      <img src={FooterLogo} alt="Logo" />
      <p>© 2024 - Todos os direitos reservados.</p>
    </Container>
  )
}
