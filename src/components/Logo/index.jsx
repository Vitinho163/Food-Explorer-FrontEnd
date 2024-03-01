import logoImg from '../../assets/Logo.svg'
import { Container } from './styles'

export function Logo() {
  return (
    <Container>
      <img src={logoImg} alt="Logo Food Explorer" />
      <h1>food explorer</h1>
    </Container>
  )
}
