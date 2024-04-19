import { useState } from 'react'
import { Container, Form } from './styles'
import { Logo } from '../../components/Logo'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Toast } from '../../components/Toast'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  const navigate = useNavigate()

  function navigateToHomeAfterDelay() {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  async function handleCreateAccount(e) {
    e.preventDefault()
    setOpenToast(false)

    await api
      .post('/users', {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
          setToastTitle('sucess')
          setToastDescription('Conta criada com sucesso!')
          setOpenToast(true)

          navigateToHomeAfterDelay()
        }
      })
      .catch((error) => {
        console.error(error)
        setToastTitle(error.response.data.status)
        setToastDescription(error.response.data.message)
        setOpenToast(true)
      })
  }
  return (
    <>
      {openToast && (
        <Toast
          label="Criar conta"
          title={toastTitle}
          description={toastDescription}
          openToast={openToast}
        />
      )}

      <Container>
        <Logo />
        <Form>
          <h2>Crie sua conta</h2>

          <Input
            label="Seu nome"
            placeholder="Exemplo: Maria da Silva"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
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
            title="Criar conta"
            disabled={name === '' || email === '' || password.length < 6}
            onClick={(e) => handleCreateAccount(e)}
          />

          <Link to={-1}>Já tenho uma conta</Link>
        </Form>
      </Container>
    </>
  )
}
