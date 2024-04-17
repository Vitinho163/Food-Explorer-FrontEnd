import { useState } from 'react'
import {
  Form,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Wrapper,
} from './styles'
import { MdOutlinePix } from 'react-icons/md'
import { PiCreditCard } from 'react-icons/pi'
import { Input } from '../Input'
import { Button } from '../Button'
import qrCode from '../../assets/qrCode.svg'

export function Tabs({ page }) {
  return (
    <TabsRoot defaultValue="pix">
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
      <TabsContent value="pix">
        <img src={qrCode} alt="qr code" />
      </TabsContent>

      <TabsContent value="card">
        <Form>
          <Input label="Número do Cartão" placeholder="0000 0000 0000 0000" />

          <Wrapper>
            <Input label="Validade" placeholder="00/00" />
            <Input label="CVV" placeholder="000" />
          </Wrapper>

          <Button title="Finalizar pagamento" />
        </Form>
      </TabsContent>
    </TabsRoot>
  )
}
