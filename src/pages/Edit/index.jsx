import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiUpload } from 'react-icons/fi'
import { api } from '../../services/api'
import { Toast } from '../../components/Toast'
import {
  Container,
  Content,
  Form,
  IngredientsWrapper,
  ProductInfoWrapper,
  Wrapper,
  ControlsWrapper,
} from './styles'
import { Header } from '../../components/Header'
import { BackButton } from '../../components/BackButton'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { IngredientItem } from '../../components/IngredientItem'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { Dialog } from '../../components/Dialog'

export function Edit() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedImageName, setSelectedImageName] = useState('Imagem')

  // states to control the product info
  const [title, setTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState('')
  const [rawPrice, setRawPrice] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  // state to control the toast
  const [openToast, setOpenToast] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')

  // array of values to the select input
  const selectValues = [
    { value: 'food', name: 'Refeição' },
    { value: 'dessert', name: 'Sobremesa' },
    { value: 'drink', name: 'Bebida' },
  ]

  // hook to navigate between pages
  const navigate = useNavigate()
  const { id } = useParams()

  function handleFileChange(event) {
    const file = event.target.files[0]
    setSelectedFile(file)
    setSelectedImageName(file.name)
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

  function formatPrice(price) {
    const formattedPrice = String(price).replace(/\D/g, '')
    setRawPrice(formattedPrice)
    return Number(formattedPrice)
  }

  // update product
  async function handleUpdateProduct(e) {
    e.preventDefault()
    setOpenToast(false)
    let response

    try {
      response = await api.put(`/products/${id}`, {
        name: title,
        category: selectedCategory,
        price,
        description,
        ingredients,
      })

      // if selectedFile exists, update the image
      if (selectedFile !== null) {
        console.log('SelectedFile exists')
        const fileUploadForm = new FormData()
        fileUploadForm.append('image', selectedFile)

        const fileResponse = await api.put(
          `/products/image/${id}`,
          fileUploadForm,
        )

        if (fileResponse.data.status === 'sucess') {
          setToastTitle(response.data.status)
          setToastDescription(response.data.message)
          setOpenToast(true)

          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
      } else {
        setToastTitle(response.data.status)
        setToastDescription(response.data.message)
        setOpenToast(true)

        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      console.error(error)
      setToastTitle(error.response.data.status)
      setToastDescription(error.response.data.message)
      setOpenToast(true)
    }
  }

  async function handleDeleteProduct() {
    setOpenToast(false)

    try {
      const response = await api.delete(`/products/${id}`)
      setToastTitle(response.data.status)
      setToastDescription(response.data.message)
      setOpenToast(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error(error)
      setToastTitle(error.response.data.status)
      setToastDescription(error.response.data.message)
      setOpenToast(true)
    }
  }

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get(`/products/${id}`)
        setTitle(response.data.name)
        setSelectedCategory(response.data.category)
        setIngredients(
          response.data.ingredients.map((ingredient) => ingredient.name),
        )
        setRawPrice(response.data.price)
        setDescription(response.data.description)
      } catch (error) {
        console.error(error.response.data)
      }
    }

    getProduct()
  }, [id])

  useEffect(() => {
    setPrice(formatPrice(rawPrice))
  }, [price, rawPrice])

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
          <h1>Editar prato</h1>

          <Form>
            <Wrapper>
              <Input
                icon={FiUpload}
                name={selectedImageName}
                type="file"
                label="Imagem do prato"
                accept="image/*"
                onChange={handleFileChange}
              />

              <Input
                label="Nome"
                placeholder="Ex.: Salada Caesar"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Select
                label="Categoria"
                title="Selecione uma categoria"
                value={selectedCategory}
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
                label="Preço"
                placeholder="R$ 00,00"
                value={rawPrice / 100}
                onChange={(e) => setRawPrice(e.target.value)}
              />
            </ProductInfoWrapper>

            <TextArea
              label="Descrição"
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <ControlsWrapper>
              <Dialog
                title="Tem certeza que deseja excluir?"
                content="Ao clicar em 'Deletar' o produto será excluído. Essa ação não poderá ser desfeita"
                deleteConfirmation={handleDeleteProduct}
              >
                <Button deleteStyle title="Excluir prato" />
              </Dialog>

              <Button
                title="Salvar alterações"
                disabled={
                  title === '' ||
                  selectedCategory === '' ||
                  ingredients.length === 0 ||
                  newIngredient !== '' ||
                  price === 0 ||
                  description === ''
                }
                onClick={handleUpdateProduct}
              />
            </ControlsWrapper>
          </Form>
        </Content>

        <Footer />
      </Container>
    </>
  )
}
