import { useState } from 'react'
import { Toast } from '../../components/Toast'
import { Header } from '../../components/Header'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { IngredientItem } from '../../components/IngredientItem'
import { TextArea } from '../../components/TextArea'
import { Footer } from '../../components/Footer'
import { FiUpload } from 'react-icons/fi'
import {
  Container,
  Content,
  Form,
  Wrapper,
  ProductInfoWrapper,
  IngredientsWrapper,
} from './styles'

export function New() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedName, setSelectedName] = useState('Selecione imagem')
  const [name, setName] = useState('')

  // state to control the selected category
  const [selectedCategory, setSelectedCategory] = useState('')
  console.log(selectedCategory)

  // state to control the ingredients
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState('')

  const [price, setPrice] = useState(0)

  const [description, setDescription] = useState('')

  // state to control the toast
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTile] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  const selectValues = [
    { value: 'food', name: 'Refeição' },
    { value: 'dessert', name: 'Sobremesa' },
    { value: 'drink', name: 'Bebida' },
  ]

  function handleFileChange(event) {
    const file = event.target.files[0]
    setSelectedFile(file)
    setSelectedName(file.name)
  }

  function handleAddIngredient() {
    setIngredients((prevState) => [...prevState, newIngredient])
    setNewIngredient('')
  }

  function handleDeleteIngredient(ingredient) {
    setIngredients((prevState) =>
      prevState.filter((item) => item !== ingredient),
    )
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

      <Container>
        <Header />

        <Content>
          <BackButton />
          <h1>Adicionar prato</h1>

          <Form>
            <Wrapper>
              <Input
                icon={FiUpload}
                name={selectedName}
                type="file"
                label="Imagem do prato"
                accept="image/*"
                placejolder="Selecione imagem"
                onChange={handleFileChange}
              />

              <Input
                label="Nome"
                placeholder="Ex.: Salada Ceasar"
                onChange={(e) => setName(e.target.value)}
              />

              <Select
                label="Categoria"
                title="Selecione uma categoria"
                onChange={setSelectedCategory}
                values={selectValues}
              />
            </Wrapper>

            <ProductInfoWrapper>
              <IngredientsWrapper>
                <label htmlFor="ingredient">Ingredientes</label>
                <div>
                  {ingredients.map((ingredient, index) => (
                    <IngredientItem
                      key={index}
                      value={ingredient}
                      onClick={() => handleDeleteIngredient(ingredient)}
                    />
                  ))}
                  <IngredientItem
                    isNew
                    placeholder="Adicionar"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    onClick={handleAddIngredient}
                  />
                </div>
              </IngredientsWrapper>

              <Input
                type="number"
                label="Preço"
                placeholder="R$ 00.00"
                onChange={(e) => setPrice(e.target.value)}
              />
            </ProductInfoWrapper>

            <TextArea
              label="Descrição"
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              title="Salvar produto"
              disabled={
                selectedFile === null ||
                name === '' ||
                selectedCategory === '' ||
                ingredients.length === 0 ||
                newIngredient !== '' ||
                price === 0 ||
                description === ''
              }
            />
          </Form>
        </Content>

        <Footer />
      </Container>
    </>
  )
}
