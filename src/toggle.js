import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import get from 'lodash/get'

export default ({ id, values, handleChange, options = [], ...props }) => (
  <ToggleButtonGroup
    value={get(values, id)}
    exclusive
    onChange={(e, value) => handleChange({ target: { id, value } })}
    size="medium"
    {...props}
  >
    {options.map((option) => (
      <ToggleButton key={option.value} value={option.value}>
        {option.name}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
)
