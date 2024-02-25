import { useState } from "react"
import { Container, Form } from "./styles"
import { Logo } from "../../components/Logo"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { api } from "../../services/api"

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleCreateAccount(e) {
    e.preventDefault()

    if(password.length < 6) {
      return alert('A senha deve ter no mínimo 6 caracteres')
    }

    try {
      await api.post('/users', {
        name, 
        email, 
        password
      })

      if(response.status == 201) {
        alert('Conta criada com sucesso')
      }
  
    } catch (error) {
      if(error.response.data.message) {
        alert(error.response.data.message);
      }
      console.error('Erro ao criar conta:', error);
    }

  }
  return(
    <Container>
      <Logo />

      <Form>
        <h2>Crie sua conta</h2>

        <Input 
          label='Seu nome'
          placeholder='Exemplo: Maria da Silva'
          onChange={(e) => setName(e.target.value)}
        />

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

        <Button 
          title='Criar conta'
          disabled={name === '' || email === '' || password === ''}
          onClick={(e) => handleCreateAccount(e)}
        />

        <a href="/register">Já tenho uma conta</a>
      </Form>
    </Container>
  )
}