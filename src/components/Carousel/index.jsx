import React from 'react'
import { Product } from '../Product'
import UseEmblaCarousel from 'embla-carousel-react'
import { Embla, EmblaContainer, EmblaViewport } from './styles'

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
    </Embla>
  )
}
