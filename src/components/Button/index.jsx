import { Container } from './styles'

export function Button({ icon: Icon, title, ...rest }) {
  return (
    <Container {...rest}>
      {Icon && <Icon />}
      <h1>{title}</h1>
    </Container>
  )
}
