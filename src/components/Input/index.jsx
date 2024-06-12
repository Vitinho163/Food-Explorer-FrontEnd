import { Container, Wrapper } from './styles'

export function Input({ icon: Icon, name, label, width, ...rest }) {
  return (
    <Container width={width}>
      {label && <label htmlFor={label}>{label}</label>}
      <Wrapper>
        {Icon && <Icon />}
        {name && <span>{name}</span>}
        <input type="text" name={label} id={label} {...rest} />
      </Wrapper>
    </Container>
  )
}
