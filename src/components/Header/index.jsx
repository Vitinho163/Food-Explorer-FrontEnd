import { useState } from 'react'
import Admin from '../../assets/Admin.svg'
import AdminMobile from '../../assets/AdminMobile.svg'
import LogoMobile from '../../assets/LogoMobile.svg'
import {
  Container,
  MenuMobile,
  MenuButton,
  SideMenu,
  Wrapper,
  MenuDesktop,
} from './styles'
import { PiReceipt } from 'react-icons/pi'
import { GoSignOut } from 'react-icons/go'
import { IoIosMenu, IoMdClose, IoIosSearch } from 'react-icons/io'
import { Input } from '../Input'
import { ItemMenu } from '../ItemMenu'
import { Footer } from '../Footer'
import { Button } from '../Button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { useCart } from '../../hooks/cart'

export function Header({ onChange }) {
  const { user, signOut } = useAuth()
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()

  // function to handle navigation and close menu
  function handleNavigate(path = '') {
    if (path) {
      navigate(`/${path}`)
    } else {
      navigate('/')
    }
    setIsMenuOpen(false)
  }

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  return (
    <Container>
      <MenuMobile>
        <MenuButton onClick={() => setIsMenuOpen(true)}>
          <IoIosMenu />
        </MenuButton>

        {user.isAdmin ? (
          <img src={AdminMobile} alt="Logo" />
        ) : (
          <img src={LogoMobile} alt="Logo" />
        )}

        {user.isAdmin ? (
          <div></div>
        ) : (
          <MenuButton onClick={() => handleNavigate('order')}>
            <PiReceipt />
            <span>{cart.length}</span>
          </MenuButton>
        )}
      </MenuMobile>

      <SideMenu $isOpen={isMenuOpen}>
        <header>
          <MenuButton onClick={() => setIsMenuOpen(false)}>
            <IoMdClose />
          </MenuButton>

          <p>Menu</p>
        </header>

        <Wrapper>
          <Input
            icon={IoIosSearch}
            placeholder="Busque por pratos ou ingredientes"
            onChange={(e) => onChange(e.target.value)}
          />

          <ItemMenu title="Home" onClick={() => handleNavigate()} />
          {user.isAdmin ? (
            <ItemMenu
              title="Novo Prato"
              onClick={() => handleNavigate('new')}
            />
          ) : (
            <ItemMenu
              title="Meus Favoritos"
              onClick={() => handleNavigate('favorites')}
            />
          )}

          {user.isAdmin ? (
            <ItemMenu
              title="Pedidos"
              onClick={() => handleNavigate('orders')}
            />
          ) : (
            <ItemMenu
              title="Histórico"
              onClick={() => handleNavigate('orders')}
            />
          )}

          <ItemMenu title="Sair" onClick={handleSignOut} />
        </Wrapper>

        <Footer />
      </SideMenu>

      <MenuDesktop>
        {user.isAdmin ? (
          <Link to="/">
            <img src={Admin} alt="logo" />
          </Link>
        ) : (
          <Link to="/">
            <img src={LogoMobile} alt="logo" />
          </Link>
        )}

        <Input
          icon={IoIosSearch}
          placeholder="Busque por pratos ou ingredientes"
          onChange={(e) => onChange(e.target.value)}
        />

        {user.isAdmin ? (
          <Link to="/orders">Pedidos</Link>
        ) : (
          <Link to="/orders">Histórico</Link>
        )}
        {!user.isAdmin && <Link to="/favorites">Favoritos</Link>}

        {user.isAdmin ? (
          <Button title="Novo Prato" onClick={() => navigate('/new')} />
        ) : (
          <Button
            title="Pedidos"
            icon={PiReceipt}
            items={cart.length}
            onClick={() => navigate('/order')}
          />
        )}

        <MenuButton onClick={handleSignOut}>
          <GoSignOut />
        </MenuButton>
      </MenuDesktop>
    </Container>
  )
}
