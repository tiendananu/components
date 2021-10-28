import React from 'react'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: ({ height }) => ({
    width: '100%',
    height,
    overflow: 'hidden'
  }),
  overlay: ({ overlay, height }) => ({
    position: 'absolute',
    width: '100%',
    height,
    zIndex: 1,
    background: overlay
      ? `linear-gradient(90deg, rgba(255,255,255,0) 28%, rgba(0,0,0,0.18) 100%)`
      : 'rgba(0,0,0,0.3)'
  }),
  background: ({ image, blur }) => ({
    width: '100%',
    height: '120%',
    WebkitFilter: blur ? `blur(${blur}px)` : 'none',
    filter: blur ? `blur(${blur}px)` : 'none',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${image})`
  })
}))

export const BackgroundProvider = ParallaxProvider

const Background = ({ overlay, image, blur, height = '100%', children }) => {
  const classes = useStyles({ overlay, height, image, blur })

  return (
    <div className={classes.root}>
      <div className={classes.overlay}>{children}</div>
      <Parallax
        styleInner={{ height: '100%' }}
        styleOuter={{ height: '100%' }}
        y={[-20, 20]}
      >
        <div className={classes.background} />
      </Parallax>
    </div>
  )
}
export default Background
