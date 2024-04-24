import React from 'react'
import { Product } from '../Product'
import UseEmblaCarousel from 'embla-carousel-react'
import { Embla, EmblaContainer, EmblaViewport } from './styles'

export function Carousel({ slides, options, products }) {
  const [emblaRef, emblaApi] = UseEmblaCarousel(options)

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {slides.map(() =>
            products.map((product) => (
              <Product key={product.id} product={product} />
            )),
          )}
        </EmblaContainer>
      </EmblaViewport>
    </Embla>
  )
}
