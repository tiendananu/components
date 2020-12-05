import React from 'react'
import get from 'lodash/get'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import { ChromePicker } from 'react-color'

export default ({ id, values, children, handleChange }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Box
      display="flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Box mx={2} display="flex" alignItems="center">
        <Typography>{children}</Typography>
      </Box>
      <div
        style={{
          background: get(values, id),
          height: 40,
          width: 40,
          borderRadius: 300
        }}
      />
      <Fade in={open}>
        <div
          style={{
            position: 'absolute',
            marginLeft: '-62px',
            zIndex: 9999
          }}
        >
          <ChromePicker
            disableAlpha
            color={get(values, id)}
            onChange={({ hex }) => handleChange({ target: { id, value: hex } })}
          />
        </div>
      </Fade>
    </Box>
  )
}