import React from 'react'
import { Product } from '../Product'
import UseEmblaCarousel from 'embla-carousel-react'
import { CarouselButton, Embla, EmblaContainer, EmblaViewport } from './styles'
import IconRight from '../../assets/IconRight.svg'
import IconLeft from '../../assets/IconLeft.svg'

export function Carousel({
  options,
  products,
  addFavorite,
  removeFavorite,
  addProductToCart,
}) {
  const [emblaRef, emblaApi] = UseEmblaCarousel(options)

  return (
    <Embla>
      <CarouselButton className="left" onClick={() => emblaApi.scrollPrev()}>
        <img src={IconLeft} alt="Seta para direita" />
      </CarouselButton>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              addProductToCart={addProductToCart}
            />
          ))}
        </EmblaContainer>
      </EmblaViewport>
      <CarouselButton className="right" onClick={() => emblaApi.scrollNext()}>
        <img src={IconRight} alt="Seta para esquerda" />
      </CarouselButton>
    </Embla>
  )
}
