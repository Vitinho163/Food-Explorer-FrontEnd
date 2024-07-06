import { api } from '../../services/api'
import {
  Form,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Wrapper,
} from './styles'
import { Input } from '../Input'
import { Button } from '../Button'
import { MdOutlinePix } from 'react-icons/md'
import { PiCookingPot, PiCreditCard, PiForkKnife } from 'react-icons/pi'
import { CiClock2 } from 'react-icons/ci'
import { Toast } from '../../components/Toast'
import { useState } from 'react'

export function Tabs({
  page,
  onClick,
  onAddressChange,
  onPaymentComplete,
  total,
  frete,
  email,
}) {
  let value = 'pix'
  if (page === 'address' || page === 'orderNotAddress') {
    value = 'address'
  }

  // toast
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  // address state
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')

  const [qrCodePix, setQrCodePix] = useState('')
  const [qrCodeCopy, setQrCodeCopy] = useState('')

  // function to validate address fields
  function validateAddressFields() {
    return city && state && street && number && zipCode
  }

  function handleNextPage(e) {
    e.preventDefault()
    if (validateAddressFields()) {
      const addressData = {
        city,
        state,
        street,
        number,
        zipCode,
        complement,
        neighborhood,
      }
      onAddressChange(addressData) // Envia os dados do endereço para o componente Order
      onClick()
    } else {
      setToastTitle('Erro de validação')
      setToastDescription(
        'Preencha todos os campos de endereço antes de continuar.',
      )
      setOpenToast(true)
    }
  }

  function handleCep(e) {
    e.preventDefault()
    const cep = e.target.value
    setZipCode(cep)

    switch (true) {
      case cep === '':
        setStreet('')
        setNumber('')
        setComplement('')
        setCity('')
        setState('')
        setNeighborhood('')
        break

      case cep.length === 8:
        setZipCode(cep)
        searchCep(cep)
        break
    }
  }

  async function searchCep(cep) {
    console.log(cep)
    try {
      const response = await api.post(`/delivery`, { cep })
      setOpenToast(false)
      if (response) {
        setStreet(response.data.logradouro)
        setNeighborhood(response.data.bairro)
        setCity(response.data.localidade)
        setState(response.data.uf)
        setZipCode(response.data.cep)

        setToastTitle('sucess')
        setToastDescription('Cep localizado com sucesso.')
        setOpenToast(true)
      }
    } catch (error) {
      if (error.response.data.message === 'Cep não localizado') {
        setOpenToast(false)
        setToastTitle('Erro')
        setToastDescription(error.response.message)
        setOpenToast(true)
      }
    }
  }

  async function handlePayment() {
    setOpenToast(false)
    try {
      const response = await api.post('/payments', {
        transaction_amount: total / 100 + frete,
        description: 'Food-Explorer-order',
        paymentMethodId: 'pix',
        email,
      })
      setQrCodePix(
        response.data.point_of_interaction.transaction_data.qr_code_base64,
      )
      setQrCodeCopy(response.data.point_of_interaction.transaction_data.qr_code)
      setToastTitle('success')
      setToastDescription('Escaneie o QR Code para concluir o pagamento.')
      setOpenToast(true)
    } catch (error) {
      console.error('Erro ao processar o pagamento:', error)
      setToastTitle('Erro')
      setToastDescription('Erro ao processar o pagamento. Tente novamente.')
      setOpenToast(true)
    }
  }

  function handleCopyQR() {
    setOpenToast(false)
    navigator.clipboard
      .writeText(qrCodeCopy)
      .then(() => {
        setToastTitle('Success')
        setToastDescription('QR Code copiado para a área de transferência.')
        setOpenToast(true)
      })
      .catch((err) => {
        console.error('Erro ao copiar o QR Code:', err)
        setToastTitle('Error')
        setToastDescription('Erro ao copiar o QR Code. Tente novamente.')
        setOpenToast(true)
      })
  }

  function handleFinalizePayment() {
    setOpenToast(false)
    setToastTitle('success')
    setToastDescription('Pagamento aprovado!')
    onPaymentComplete()
  }

  return (
    <>
      {openToast && (
        <Toast
          title={toastTitle}
          description={toastDescription}
          open={openToast}
        />
      )}

      <TabsRoot defaultValue={value}>
        {page !== 'address' && page !== 'orderNotAddress' && (
          <TabsList>
            <TabsTrigger value="pix">
              {' '}
              <MdOutlinePix /> PIX
            </TabsTrigger>

            <TabsTrigger value="card">
              {' '}
              <PiCreditCard /> Crédito
            </TabsTrigger>
          </TabsList>
        )}

        {(page === 'address' || page === 'orderNotAddress') && (
          <>
            <TabsContent value="address" className="address">
              <Form>
                <Input
                  label="Endereço"
                  placeholder="Exemplo: Rua 7 de Setembro"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />

                <Wrapper>
                  <Input
                    label="Numero"
                    placeholder="000"
                    width="9rem"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <Input
                    label="Cep"
                    placeholder="00000-000"
                    value={zipCode}
                    onChange={handleCep}
                  />
                </Wrapper>

                <Input
                  label="Complemento"
                  placeholder="Exemplo: Proximo Mercado Boa"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />

                <Input
                  label="Bairro"
                  placeholder="Exemplo: Vila Guilherme"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                />

                <Wrapper>
                  <Input
                    label="Cidade"
                    placeholder="Francisco Morato"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    label="Estado"
                    placeholder="SP"
                    width="7rem"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </Wrapper>

                <Button title="Avançar" onClick={handleNextPage} />
              </Form>
            </TabsContent>
          </>
        )}

        {(page === 'payment' || page === 'order') && (
          <>
            <TabsContent value="pix">
              {qrCodePix ? (
                <>
                  <img
                    src={`data:image/png;base64,${qrCodePix}`}
                    alt="QR Code"
                    style={{ width: '181px', height: '181px' }}
                  />
                  <Button title="QrCode copia e cola" onClick={handleCopyQR} />
                  <Button
                    title="Verificar pagamento"
                    onClick={handleFinalizePayment}
                  />
                </>
              ) : (
                <>
                  <p>Carregando QR Code...</p>
                  <Button title="Criar pagamento" onClick={handlePayment} />
                </>
              )}
            </TabsContent>
            <TabsContent value="card">
              <Form>
                <Input
                  label="Número do Cartão"
                  placeholder="0000 0000 0000 0000"
                />
                <Wrapper>
                  <Input label="Validade" placeholder="00/00" />
                  <Input label="CVV" placeholder="000" />
                </Wrapper>
                <Button
                  title="Finalizar pagamento"
                  onClick={handleFinalizePayment}
                />
              </Form>
            </TabsContent>
          </>
        )}

        {page === 'pending' && (
          <>
            <TabsContent value="pix">
              <CiClock2 />
              <h2>Aguardando pagamento no caixa</h2>
            </TabsContent>

            <TabsContent value="card">
              <CiClock2 />
              <h2>Aguardando pagamento no caixa</h2>
            </TabsContent>
          </>
        )}

        {page === 'preparing' && (
          <>
            <TabsContent value="pix">
              <PiCookingPot />
              <h2>Pedido sendo preparado</h2>
            </TabsContent>

            <TabsContent value="card">
              <PiCookingPot />
              <h2>Pedido sendo preparado</h2>
            </TabsContent>
          </>
        )}

        {page === 'delivered' && (
          <>
            <TabsContent value="pix">
              <PiForkKnife />
              <h2>Pedido entregue!</h2>
            </TabsContent>

            <TabsContent value="card">
              <PiForkKnife />
              <h2>Pedido entregue!</h2>
            </TabsContent>
          </>
        )}
      </TabsRoot>
    </>
  )
}
