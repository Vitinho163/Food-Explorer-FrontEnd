import styled from 'styled-components'

export const Embla = styled.div`
  position: relative;
  --slide-spacing: 1rem;
  --slide-size: auto;
  --slide-height: 19rem;
`

export const EmblaViewport = styled.div`
  overflow: hidden;
`

export const EmblaContainer = styled.div`
  backface-visibility: hidden;
  display: flex;
  gap: 2.8rem;
  touch-action: pan-y;
`

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${({ theme }) => theme.colors.dark_100};
  cursor: pointer;
  z-index: 1;

  &.left {
    left: -1rem;
  }

  &.right {
    right: -1rem;
  }
`
