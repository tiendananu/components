import React from 'react'
import get from 'lodash/get'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
export default ({ id, values, children, handleChange }) => (
  <FormControlLabel
    control={
      <Checkbox
        id={id}
        onChange={handleChange}
        checked={get(values, id)}
        color="primary"
      />
    }
    label={children}
  />
)
