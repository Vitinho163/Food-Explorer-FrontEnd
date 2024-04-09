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

        {!user.isAdmin && (
          <MenuButton onClick={() => navigate('/order')}>
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

          <ItemMenu title="Home" onClick={() => navigate('/')} />
          {user.isAdmin ? (
            <ItemMenu title="Novo Prato" onClick={() => navigate('/new')} />
          ) : (
            <ItemMenu
              title="Meus Favoritos"
              onClick={() => navigate('/favorites')}
            />
          )}

          {user.isAdmin ? (
            <ItemMenu title="Pedidos" onClick={() => navigate('/orders')} />
          ) : (
            <ItemMenu title="Histórico" onClick={() => navigate('/orders')} />
          )}

          <ItemMenu title="Sair" onClick={handleSignOut} />
        </Wrapper>

        <Footer />
      </SideMenu>

      <MenuDesktop>
        {user.isAdmin ? (
          <img src={Admin} alt="logo" />
        ) : (
          <img src={LogoMobile} alt="logo" />
        )}

        <Input
          icon={IoIosSearch}
          placeholder="Busque por pratos ou ingredientes"
          onChange={(e) => onChange(e.target.value)}
        />

        {user.isAdmin ? (
          <Link to="/orders">Pedidos</Link>
        ) : (
          <Link to="/Histórico">Pedidos</Link>
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
