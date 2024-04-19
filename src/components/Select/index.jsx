/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import {
  Container,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectIcon,
  SelectLabel,
  SelectSeparator,
  SelectViewport,
  StyledItem,
  StyledItemIndicator,
  ValueWrapper,
} from './styles'
import { GoChevronDown } from 'react-icons/go'
import { BsCheck2 } from 'react-icons/bs'

export function Select({ onChange, value, label, title, values }) {
  return (
    <Container>
      <label htmlFor={label}>{label}</label>

      <SelectRoot value={value} onValueChange={onChange} required>
        <SelectTrigger id={label} aria-label={label}>
          <SelectPrimitive.Value placeholder={title} />
          <SelectIcon>
            <GoChevronDown />
          </SelectIcon>
        </SelectTrigger>
        <SelectPrimitive.Portal>
          <SelectContent>
            <SelectViewport>
              <SelectPrimitive.Group>
                <SelectLabel>{label}</SelectLabel>

                {label && <SelectSeparator />}

                {values &&
                  values.map((value, index) => (
                    <SelectItem
                      status={value.status}
                      key={index}
                      value={value.value}
                    >
                      {value.name}
                    </SelectItem>
                  ))}
              </SelectPrimitive.Group>
            </SelectViewport>
          </SelectContent>
        </SelectPrimitive.Portal>
      </SelectRoot>
    </Container>
  )
}

const SelectItem = forwardRef(
  ({ status, children, ...props }, forwardedRef) => {
    return (
      <StyledItem {...props} ref={forwardedRef}>
        <SelectPrimitive.ItemText>
          <ValueWrapper>
            {status && <div data-status={status}></div>}
            {children}
          </ValueWrapper>
        </SelectPrimitive.ItemText>
        <StyledItemIndicator>
          <BsCheck2 />
        </StyledItemIndicator>
      </StyledItem>
    )
  },
)
