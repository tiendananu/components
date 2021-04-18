import React from 'react'
import Carousel from 'react-material-ui-carousel'

export default ({ images }) => {
  if (!images || !images.length) return null
  return (
    <Carousel
      navButtonsAlwaysInvisible={Boolean(images.length <= 1)}
      autoPlay={false}
    >
      {images.map((src) => (
        <img
          style={{ width: '100%', height: '100%', minHeight: '300px' }}
          src={src}
        />
      ))}
    </Carousel>
  )
}
