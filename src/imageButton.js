import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden'
  },
  image: {
    transition: 'transform 400ms, filter 400ms',
    '&:hover': {
      filter: 'blur(2px)',
      transform: 'scale(1.035)'
    }
  }
}))

const ImageButton = ({ src, children, ...props }) => {
  const classes = useStyles()

  return (
    <Button
      className={classes.root}
      fullWidth
      style={{ padding: 0 }}
      {...props}
    >
      <img className={classes.image} src={src} width="100%" height="100%" />
      <Box
        position="absolute"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">{children}</Typography>
      </Box>
    </Button>
  )
}

export default ImageButton
