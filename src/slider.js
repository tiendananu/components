import React from 'react'
import get from 'lodash/get'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Slider from '@material-ui/core/Slider'
import FormControl from '@material-ui/core/FormControl'

export default ({
  id,
  values,
  children,
  handleChange,
  min,
  max,
  sensibility
}) => (
  <FormControl fullWidth size="small">
    <FormControlLabel
      style={{ width: '100%', margin: 0 }}
      labelPlacement="top"
      label={children}
      control={
        <Slider
          id={id}
          name={children}
          valueLabelDisplay
          onChangeCommitted={(e, value) =>
            handleChange({ target: { id, value } })
          }
          defaultValue={get(values, id)}
          getAriaValueText={() => get(values, id)}
          step={sensibility}
          min={min}
          max={max}
        />
      }
    />
  </FormControl>
)
