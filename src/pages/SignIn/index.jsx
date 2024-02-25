import { useState } from "react"
import { Container, Form } from './styles'
import { Logo } from "../../components/Logo"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return(
    <Container>
      <Logo />

      <Form>
        <h2>Faça login</h2>

        <Input 
          label='Email'
          placeholder='Exemplo: exemplo@exemplo.com.br'
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input 
          label='Senha'
          placeholder='No mínimo 6 caracteres'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title='Entrar' disabled={email === '' || password.length < 6} />

        <a href="/registerAcoount">Criar uma conta</a>
      </Form>
    </Container>
  )
}