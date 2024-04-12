import { Container } from './styles'
import { FiPlus, FiX } from 'react-icons/fi'

export function IngredientItem({ isNew, value, onClick, ...rest }) {
  return (
    <Container $isnew={isNew}>
      <input
        type="text"
        id="ingredient"
        value={value}
        readOnly={!isNew}
        {...rest}
      />

      <button
        type="button"
        onClick={onClick}
        className={isNew ? 'button-add' : 'button-delete'}
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  )
}
