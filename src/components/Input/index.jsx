import { Container, Wrapper } from './styles'

export function Input({ icon: Icon, label, ...rest}) {
  return(
    <Container>
      {label && <label htmlFor={label}>{label}</label>}
      <Wrapper>
        {Icon && <Icon />}
        <input type="text" name={label} id={label} {...rest} />
      </Wrapper>
    </Container>
  )
}