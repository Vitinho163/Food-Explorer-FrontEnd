import { useState } from 'react'
import { Container, Form } from './styles'
import { Logo } from '../../components/Logo'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Toast } from '../../components/Toast'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  const { signIn } = useAuth()

  async function handleSignIn(e) {
    e.preventDefault()
    setOpenToast(false)

    const response = await signIn({ email, password })
    console.log('response: ', response)

    setToastTitle(response.status)
    setToastDescription(response.message)
    setOpenToast(true)
  }

  return (
    <Container>
      <Logo />

      <Form>
        <h2>Faça login</h2>

        <Input
          label="Email"
          placeholder="Exemplo: exemplo@exemplo.com.br"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Senha"
          placeholder="No mínimo 6 caracteres"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          title="Entrar"
          disabled={email === '' || password.length < 6}
          onClick={(e) => handleSignIn(e)}
        />

        <Link to="/register">Criar uma conta</Link>

        <Toast
          label="Realizar login"
          title={toastTitle}
          description={toastDescription}
          openToast={openToast}
        />
      </Form>
    </Container>
  )
}
