import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [data, setData] = useState({})

  async function signIn({ email, password }) {
    try {
      const response = await api.post(
        '/sessions',
        { email, password },
        { withCredentials: true },
      )

      const { user } = response.data

      // save user data in local storage
      localStorage.setItem('@FoodExplorerJV:user', JSON.stringify(user))

      // set user data in state
      setData({ user })

      return {
        status: 'Sucess',
        message: 'Login realizado com sucesso!',
      }
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.data.status,
          message: error.response.data.message,
        }
      } else {
        return {
          status: 'Error',
          message: 'Erro ao fazer login, tente novamente mais tarde.',
        }
      }
    }
  }

  async function signOut() {
    // remove user data from local storage
    localStorage.removeItem('@FoodExplorerJV:user')
    setData({})
  }

  useEffect(() => {
    const user = localStorage.getItem('@FoodExplorerJV:user')

    if (user) {
      setData({ user: JSON.parse(user) })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
