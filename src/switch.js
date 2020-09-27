import React from 'react'
import get from 'lodash/get'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default ({ id, values, children, handleChange }) => (
  <FormControlLabel
    control={
      <Switch
        id={id}
        checked={get(values, id)}
        onChange={handleChange}
        value={id}
      />
    }
    label={children}
  />
)
