import React from 'react'
import get from 'lodash/get'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Avatar from '@material-ui/core/Avatar'
import Fade from '@material-ui/core/Fade'
import { ChromePicker } from 'react-color'

export default ({ id, values, children, handleChange }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <FormControlLabel
      style={{ width: '100%', margin: 0 }}
      labelPlacement="top"
      control={
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Avatar
            style={{
              background: get(values, id),
              margin: '15px auto'
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
                color={get(values, id)}
                onChange={({ hex }) =>
                  handleChange({ target: { id, value: hex } })
                }
              />
            </div>
          </Fade>
        </div>
      }
      label={children}
    />
  )
}
